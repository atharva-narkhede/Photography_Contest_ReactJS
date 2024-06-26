import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import url from "../url";

const ContestPhotos = ({ contestTitle, onBack }) => {
    const [photos, setPhotos] = useState([]);
    const [votedPhoto, setVotedPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotosAndVotes = async () => {
            try {
                const photosResponse = await axios.get(url + "/photos/fetch");
                const filteredPhotos = photosResponse.data.filter(photo => photo.contest_title === contestTitle);
                setPhotos(filteredPhotos);

                const votesResponse = await axios.get(url + "/votes/fetch");
                const userVote = votesResponse.data.find(vote => vote.voted_by === sessionStorage.getItem("u_email") && vote.contest_title === contestTitle);
                if (userVote) {
                    setVotedPhoto(userVote.photo_url);
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPhotosAndVotes();
    }, [contestTitle]);

    const handleVote = async (photoUrl) => {
        if (votedPhoto) {
            alert("You have already voted for this contest.");
            return; // Prevent re-voting
        }

        try {
            const response = await axios.post(url + "/votes/insert", {
                photo_url: photoUrl,
                voted_by: sessionStorage.getItem("u_email"),
                contest_title: contestTitle
            });

            setVotedPhoto(photoUrl);
            console.log('Vote submitted successfully', response.data);
        } catch (error) {
            console.error('There was an error submitting the vote!', error);
        }
    };

    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner animation="border" role="status"><span className="sr-only"></span></Spinner></div>;
    if (error) return <div>Error loading photos: {error.message}</div>;

    return (
        <Container>
            <Button variant="secondary" onClick={onBack}>Back to Contests</Button>
            <Row>
                {photos.map(photo => (
                    <Col md={4} key={photo._id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={photo.photo_url} />
                            <Card.Body>
                                <Card.Text>Uploaded by: {photo.uploaded_by}</Card.Text>
                                <Button 
                                    variant={votedPhoto === photo.photo_url ? "success" : "primary"} 
                                    onClick={() => handleVote(photo.photo_url)}
                                    disabled={!!votedPhoto} // Disable button if a vote is already given
                                >
                                    {votedPhoto === photo.photo_url ? "Voted" : "Vote"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ContestPhotos;
