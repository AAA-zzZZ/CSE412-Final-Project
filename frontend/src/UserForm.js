import React, { useState } from 'react';

function UserForm({ mode, initialData, onSuccess }) {
    const [username, setUsername] = useState(initialData ? initialData.username : '');
    const [email, setEmail] = useState(initialData ? initialData.email : '');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        const url = mode === 'add'
            ? 'http://localhost:5000/api/users'
            : `http://localhost:5000/api/users/${initialData.userid}`;

        const method = mode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                alert(`User ${mode === 'add' ? 'Added' : 'Updated'} Successfully!`);
                onSuccess();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
            <h2>{mode === 'add' ? 'Add New User' : 'Update User'}</h2>
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ marginBottom: '20px' }}/>
            <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                {mode === 'add' ? 'Add User' : 'Save Changes'}
            </button>
        </form>
    );
}

export default UserForm;