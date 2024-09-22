import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import 'aos/dist/aos.css'; // AOS for animations
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for responsiveness
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; // Import your auth service

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({ name: '', username: '', role: '' });
    const navigate = useNavigate();

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await userService.getUsers();
        setUsers(data);
    };

    const handleDeleteUser = async (userId) => {
        await userService.deleteUser(userId);
        fetchUsers();
    };

    const handleEditUser = async () => {
        await userService.updateUser(editingUserId, editingUser);
        setEditingUserId(null);
        fetchUsers();
    };

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setEditingUser({ name: user.name, username: user.username, role: user.role });
    };

    const handleLogout = async () => {
        await authService.logout(); // Make sure to await logout if it returns a promise
        navigate('/login');
    };
    
    return (
        <div className="min-h-screen bg-light">
            {/* Header */}
            <header className="bg-primary text-white p-4 d-flex justify-content-between align-items-center shadow-sm">
                <div>
                    <h1 className="h3 mb-0">User Management Dashboard</h1>
                </div>
                <div>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Content Section */}
            <div className="container mt-5" data-aos="fade-up">
                <h2 className="h4 mb-4">Manage Users</h2>

                <div className="bg-white p-4 rounded shadow-sm" data-aos="fade-up">
                    <h3 className="h5 mb-3">Users List</h3>
                    {users.map((user) => (
                        <div key={user.id} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                            {editingUserId === user.id ? (
                                <div className="d-flex align-items-center">
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        placeholder="Name"
                                        className="form-control me-2"
                                    />
                                    <input
                                        type="text"
                                        value={editingUser.username}
                                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                        placeholder="Username"
                                        className="form-control me-2"
                                    />
                                    <select
                                        value={editingUser.role}
                                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                        className="form-control me-2"
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <button onClick={handleEditUser} className="btn btn-success">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className="mb-0">
                                            <strong>{user.username}</strong> ({user.name}) &gt; <span className="badge bg-primary">{user.role}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="btn btn-warning me-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
