import React, { useState, useEffect } from 'react';

function UserList({ onEdit }) {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                    <th>ID</th><th>Username</th><th>Email</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? users.map(u => (
                    <tr key={u.userid}>
                        <td>{u.userid}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                            <button onClick={() => onEdit(u)} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Edit</button>
                            <button onClick={() => handleDelete(u.userid)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </td>
                    </tr>
                )) : <tr><td colSpan="4">No users found.</td></tr>}
            </tbody>
        </table>
    );
}

export default UserList;