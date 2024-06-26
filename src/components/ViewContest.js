import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ToggleButtonGroup, ToggleButton, Modal, Form, Spinner } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import url from "../url";
import ContestPhotos from './ContestPhotos';
import PastContestPhotos from './PastContestPhotos';

// Axios configuration with interceptors
let spinnerCounter = 0;

const showSpinner = () => {
  spinnerCounter++;
  if (spinnerCounter === 1) {
    const spinnerElement = document.createElement('div');
    spinnerElement.id = 'spinner-overlay';
    spinnerElement.style.position = 'fixed';
    spinnerElement.style.top = '0';
    spinnerElement.style.left = '0';
    spinnerElement.style.width = '100%';
    spinnerElement.style.height = '100%';
    spinnerElement.style.display = 'flex';
    spinnerElement.style.justifyContent = 'center';
    spinnerElement.style.alignItems = 'center';
    spinnerElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    document.body.appendChild(spinnerElement);

    ReactDOM.render(<Spinner animation="border" role="status"><span className="sr-only"></span></Spinner>, spinnerElement);
  }
};

const hideSpinner = () => {
  spinnerCounter--;
  if (spinnerCounter === 0) {
    const spinnerElement = document.getElementById('spinner-overlay');
    if (spinnerElement) {
      ReactDOM.unmountComponentAtNode(spinnerElement);
      document.body.removeChild(spinnerElement);
    }
  }
};

// Request interceptor
axios.interceptors.request.use(request => {
  showSpinner();
  return request;
}, error => {
  hideSpinner();
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(response => {
  hideSpinner();
  return response;
}, error => {
  hideSpinner();
  return Promise.reject(error);
});

const ViewContests = () => {
    const [contests, setContests] = useState([]);
    const [filter, setFilter] = useState("ongoing"); // Default to ongoing contests
    const [selectedContest, setSelectedContest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        contest_title: '',
        uploaded_by: '',
        photo_url: ''
    });
    const [userPhotos, setUserPhotos] = useState([]);
    const [viewingPastContest, setViewingPastContest] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    // New state for file upload
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const user = sessionStorage.getItem('u_email');

    useEffect(() => {
        // Fetch the contest data
        axios.get(url + '/contests/fetch')
            .then(response => {
                if (response.status === 200) {
                    setContests(response.data);
                } else {
                    console.error('Error fetching contests: ', response.status);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the contests!', error);
            })
            .finally(() => setLoading(false)); // Stop loading spinner

        // Fetch the user's photos
        if (user) {
            axios.get(url + '/photos/fetch')
                .then(response => {
                    if (response.status === 200) {
                        setUserPhotos(response.data.filter(photo => photo.uploaded_by === user));
                    } else {
                        console.error('Error fetching photos: ', response.status);
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching the photos!', error);
                });
        }
    }, [user]);

    const today = new Date();

    const ongoingContests = contests.filter(contest => new Date(contest.start_date) <= today && new Date(contest.end_date) >= today);
    const pastContests = contests.filter(contest => new Date(contest.end_date) < today);
    const upcomingContests = contests.filter(contest => new Date(contest.start_date) > today);

    const handleViewClick = (contestTitle, isPast) => {
        setSelectedContest(contestTitle);
        setViewingPastContest(isPast);
    };

    const handleJoinClick = (contest) => {
        // Ensure userPhotos is updated and contains the current user's photos
        const existingPhoto = userPhotos.find(photo => photo.contest_title === contest.title && photo.uploaded_by === user);
        if (existingPhoto) {
            alert("You have already participated in this contest.");
            return;
        }
        setModalData({
            contest_title: contest.title,
            uploaded_by: user, // Use session data
            photo_url: ''
        });
        setShowModal(true);
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileSize = selectedFile.size / 1024 / 1024; // in MB
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            // Validate file size and type
            if (fileSize > 5) {
                setFileError('File size exceeds 5 MB limit.');
                setFile(null);
            } else if (!allowedTypes.includes(selectedFile.type)) {
                setFileError('Only JPG, JPEG, and PNG file types are allowed.');
                setFile(null);
            } else {
                setFile(selectedFile);
                setFileError('');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a valid image file.");
            return;
        }

        // Upload image to imgbb API
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', '10fc3bdb39131e1d5f242cbb5d183090'); // Replace with your imgbb API key

        axios.post('https://api.imgbb.com/1/upload', formData)
            .then(response => {
                if (response.data && response.data.data && response.data.data.url) {
                    const imgUrl = response.data.data.url;

                    // Submit modalData to backend using imgUrl
                    axios.post(url + "/photos/insert", {
                        ...modalData,
                        photo_url: imgUrl  // Update photo_url with imgUrl
                    })
                        .then(response => {
                            if (response.status === 200) {
                                alert("Photo submitted successfully")
                                console.log('Photo submitted successfully', response.data);
                                setUserPhotos([...userPhotos, response.data]);
                                setShowModal(false);
                            } else {
                                console.error('Error submitting photo:', response.status);
                            }
                        })
                        .catch(error => {
                            alert("Error submitting photo");
                            console.error('There was an error submitting the photo!', error);
                        });
                } else {
                    alert("Failed to upload image to imgbb.");
                }
            })
            .catch(error => {
                alert("Error uploading image to imgbb.");
                console.error('There was an error uploading the image to imgbb!', error);
            });
    };

    const handleBack = () => {
        setSelectedContest(null);
        setViewingPastContest(false);
        setFilter("ongoing"); // Reset filter to show ongoing contests
    };

    const renderContests = (contests, isPast) => (
        contests.map((contest, index) => (
            <Col md={4} key={index} className="mb-4">
                <Card>
                    <Card.Body>
                        <Card.Title>{contest.title}</Card.Title>
                        <Card.Text>{contest.description}</Card.Text>
                        <Card.Text>
                            <small className="text-muted">
                                Start Date: {new Date(contest.start_date).toLocaleDateString()}
                            </small>
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">
                                End Date: {new Date(contest.end_date).toLocaleDateString()}
                            </small>
                        </Card.Text>
                        {isPast ? (
                            <Button variant="info" className="me-2" onClick={() => handleViewClick(contest.title, true)}>View Winner</Button>
                        ) : new Date(contest.start_date) > today ? (
                            <Button variant="secondary" disabled>Wait</Button>
                        ) : (
                            <>
                                <Button variant="primary" className="me-2" onClick={() => handleViewClick(contest.title, false)}>View</Button>
                                <Button variant="success" onClick={() => handleJoinClick(contest)}>Join</Button>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        ))
    );

    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner animation="border" role="status"><span className="sr-only"></span></Spinner></div>;

    return (
        <Container>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                body, .navbar, .navbar-brand, .nav-link, .btn, .card-title, .card-text, .text-muted {
                    font-family: 'Raleway', sans-serif;
                }
                `}
            </style>

            {selectedContest ? (
                viewingPastContest ? (
                    <PastContestPhotos contestTitle={selectedContest} onBack={handleBack} />
                ) : (
                    <ContestPhotos contestTitle={selectedContest} onBack={handleBack} />
                )
            ) : (
                <>
                    <Row className="my-4">
                        <Col className="text-center">
                            <ToggleButtonGroup type="radio" name="options" value={filter} onChange={setFilter}>
                                <ToggleButton id="ongoing-contests" type="radio" variant="outline-primary" value="ongoing">
                                    Ongoing Contests
                                </ToggleButton>
                                <ToggleButton id="past-contests" type="radio" variant="outline-secondary" value="past">
                                    Past Contests
                                </ToggleButton>
                                <ToggleButton id="upcoming-contests" type="radio" variant="outline-success" value="upcoming">
                                    Upcoming Contests
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        {filter === "ongoing" && renderContests(ongoingContests, false)}
                        {filter === "past" && renderContests(pastContests, true)}
                        {filter === "upcoming" && renderContests(upcomingContests, false)}
                    </Row>
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Contest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Contest Title</Form.Label>
                            <Form.Control type="text" name="contest_title" value={modalData.contest_title} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formUploadedBy" className="mt-3">
                            <Form.Label>Uploaded By</Form.Label>
                            <Form.Control type="text" name="uploaded_by" value={modalData.uploaded_by} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formPhotoFile" className="mt-3">
                            <Form.Label>Upload Photo</Form.Label>
                            <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                            {fileError && <Form.Text className="text-danger">{fileError}</Form.Text>}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ViewContests;
