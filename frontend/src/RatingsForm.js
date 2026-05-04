import React, { useState } from 'react';

function RatingsForm({ mode, initialData, onSuccess }) {
    const [userid, setUserid] = useState(initialData ? initialData.userid : '');
    const [productid, setProductid] = useState(initialData ? initialData.productid : '');
    const [rating, setRating] = useState(initialData ? initialData.rating : '');
    const [comment, setComment] = useState(initialData ? initialData.comment : '');
    const [datereviewed, setDatereviewed] = useState(initialData ? initialData.datereviewed : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ratingData = { userid, productid, rating, comment, datereviewed };

        const endpoint = mode === 'add'
            ? 'http://localhost:5000/api/ratings'
            : `http://localhost:5000/api/ratings/${initialData.userid}/${initialData.productid}`;

        const method = mode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ratingData),
            });
            if (response.ok) {
                alert(`Rating ${mode === 'add' ? 'Added' : 'Updated'} Successfully!`);
                onSuccess();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
            <h2>{mode === 'add' ? 'Add New Rating' : 'Update Rating'}</h2>
            <label>User ID</label>
            <input type="number" value={userid} onChange={e => setUserid(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Product ID</label>
            <input type="number" value={productid} onChange={e => setProductid(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Rating (1-5)</label>
            <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Comment</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} style={{ marginBottom: '10px' }}/>
            <label>Date Reviewed</label>
            <input type="date" value={datereviewed} onChange={e => setDatereviewed(e.target.value)} required style={{ marginBottom: '20px' }}/>
            <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                {mode === 'add' ? 'Add Rating' : 'Save Changes'}
            </button>
        </form>
    );
}

export default RatingsForm;