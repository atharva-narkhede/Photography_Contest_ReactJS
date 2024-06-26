import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from "../url"; // Replace with your API URL
import { Modal, Button } from 'react-bootstrap';
import AdminContestPhotos from './AdminContestPhotos'; // Import the new component

const AdminDashboard = () => {
    const [contests, setContests] = useState([]);
    const [newContest, setNewContest] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: ''
    });
    const [editContest, setEditContest] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contestToDelete, setContestToDelete] = useState(null);
    const [viewContest, setViewContest] = useState(null); // State for viewing contest photos
    const navigate = useNavigate();
    const admin = true; // Replace with actual admin status check

    useEffect(() => {
        if (!admin) {
            navigate('/admin-login'); // Redirect to login if not admin
        }
        fetchContests();
    }, [admin, navigate]);

    const fetchContests = async () => {
        try {
            const response = await axios.get(`${url}/contests/fetch`);
            setContests(response.data);
        } catch (error) {
            console.error('Error fetching contests:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContest({ ...newContest, [name]: value });
    };

    // const handleCreateContest = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`${url}/contests/insert`, newContest);
    //         setNewContest({ title: '', description: '', start_date: '', end_date: '' });
    //         fetchContests();
    //         setShowCreateModal(false);
    //         alert("Contest Added");

    //     } catch (error) {
    //         console.error('Error creating contest:', error);
    //     }
    // };
    const handleCreateContest = async (e) => {
        e.preventDefault();
    
        // Check if the contest with the same title already exists
        const existingContest = contests.find(contest => contest.title === newContest.title);
        if (existingContest) {
            alert(`Contest with title "${newContest.title}" already exists.`);
            return;
        }
    
        try {
            // If the contest title doesn't exist, proceed to create it
            await axios.post(`${url}/contests/insert`, newContest);
            setNewContest({ title: '', description: '', start_date: '', end_date: '' });
            fetchContests(); // Fetch contests again to update the list
            setShowCreateModal(false);
            alert("Contest Added");
        } catch (error) {
            console.error('Error creating contest:', error);
            alert("Error creating contest. Please try again.");
        }
    };
    

    const handleDeleteContest = async (contest) => {
        try {
            console.log("DELETING CONTEST", contest.title);
    
            // Delete contest
            try {
                await axios.delete(`${url}/contests/delete`, {
                    data: {
                        title: contest.title
                    }
                });
                console.log("DONE DELETING CONTEST");
            } catch (error) {
                console.error('Error deleting contest:', error);
            }
    
            // Delete associated votes
            try {
                await axios.delete(`${url}/votes/delete`, {
                    data: {
                        contest_title: contest.title
                    }
                });
                console.log("DONE DELETING VOTES");
            } catch (error) {
                console.error('Error deleting votes:', error);
            }
    
            // Delete all photos related to the contest
            try {
                await axios.delete(`${url}/photos/deleteall`, {
                    data: {
                        contest_title: contest.title
                    }
                });
                console.log("DONE DELETING PHOTOS");
            } catch (error) {
                console.error('Error deleting photos:', error);
            }
    
            // Fetch contests again (assuming fetchContests is a function that does this)
            fetchContests();
    
            // Hide delete modal after successful deletion
            setShowDeleteModal(false);
        } catch (error) {
            console.error('General error during deletion:', error);
        }
    };
    

    const handleEditContest = (contest) => {
        setEditContest(contest);
        setShowEditModal(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditContest({ ...editContest, [name]: value });
    };

    const handleUpdateContest = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${url}/contests/update`, {
                title: editContest.title,
                description: editContest.description,
                start_date: editContest.start_date,
                end_date: editContest.end_date
            });
            setEditContest(null);
            fetchContests();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating contest:', error);
        }
    };

    const handleViewContest = (contest) => {
        setViewContest(contest);
    };

    const openDeleteModal = (contest) => {
        setContestToDelete(contest);
        setShowDeleteModal(true);
    };

    return (
        <div className="container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700&display=swap');

                body {
                    font-family: 'Raleway', sans-serif;
                }

                .container {
                    padding-top: 20px;
                }

                .card {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .card-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .card-text {
                    font-size: 0.9rem;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .btn {
                    margin-right: 0.5rem;
                }

                .btn-primary {
                    background-color: #007bff;
                    border-color: #007bff;
                }

                .btn-warning {
                    background-color: #ffc107;
                    border-color: #ffc107;
                }

                .btn-danger {
                    background-color: #dc3545;
                    border-color: #dc3545;
                }
            `}</style>
            <h2 className="text-center mt-4">Admin Dashboard</h2>

            <h3 className="mt-4">Create Contest</h3>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Contest
            </Button>

            <h3>Manage Contests</h3>
            <div className="row">
                {contests.map(contest => (
                    <div className="col-md-4" key={contest._id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{contest.title}</h5>
                                <p className="card-text">{contest.description}</p>
                                <p className="card-text"><small className="text-muted">Start: {new Date(contest.start_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
                                <p className="card-text"><small className="text-muted">End: {new Date(contest.end_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
                                <Button variant="warning" onClick={() => handleEditContest(contest)}>Edit</Button>
                                <Button variant="danger" onClick={() => openDeleteModal(contest)}>Delete</Button>
                                <Button variant="info" onClick={() => handleViewContest(contest)}>View Photos</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Contest Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Contest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleCreateContest}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={newContest.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={newContest.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Start Date (IST):</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="start_date"
                                value={newContest.start_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date (IST):</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="end_date"
                                value={newContest.end_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Create Contest
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Edit Contest Modal */}
            {editContest && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Contest</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleUpdateContest}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={editContest.title}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={editContest.description}
                                    onChange={handleEditInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Start Date (IST):</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    value={editContest.start_date}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date (IST):</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="end_date"
                                    value={editContest.end_date}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </div>
                            <Button variant="primary" type="submit">
                                Update Contest
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}

            {/* Delete Contest Modal */}
            {contestToDelete && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Contest</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete the contest "{contestToDelete.title}"?</p>
                        <Button variant="danger" onClick={() => handleDeleteContest(contestToDelete)}>
                            Delete
                        </Button>
                    </Modal.Body>
                </Modal>
            )}

            {/* View Contest Photos */}
            {viewContest && (
                <AdminContestPhotos
                    contest={viewContest}
                    show={!!viewContest}
                    onHide={() => setViewContest(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
