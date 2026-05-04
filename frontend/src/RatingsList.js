import React, { useState, useEffect } from 'react';

function RatingsList({ onEdit }) {
    const [ratings, setRatings] = useState([]);

    const fetchRatings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ratings');
            const data = await response.json();
            setRatings(data);
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    const handleDelete = async (userid, productid) => {
        if (!window.confirm('Are you sure you want to delete this rating?')) return;
        try {
            await fetch(`http://localhost:5000/api/ratings/${userid}/${productid}`, { method: 'DELETE' });
            fetchRatings();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                    <th>Username</th><th>Product</th><th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ratings.length > 0 ? ratings.map((r, i) => (
                    <tr key={i}>
                        <td>{r.username}</td>
                        <td>{r.productname}</td>
                        <td>{r.rating}</td>
                        <td>{r.comment}</td>
                        <td>{r.datereviewed}</td>
                        <td>
                            <button onClick={() => onEdit(r)} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Edit</button>
                            <button onClick={() => handleDelete(r.userid, r.productid)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </td>
                    </tr>
                )) : <tr><td colSpan="6">No ratings found.</td></tr>}
            </tbody>
        </table>
    );
}

export default RatingsList;