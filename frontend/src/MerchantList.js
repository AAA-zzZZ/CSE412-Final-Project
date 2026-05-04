import React, { useState, useEffect } from 'react';

function MerchantList({ onEdit }) {
    const [merchants, setMerchants] = useState([]);

    const fetchMerchants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/merchants');
            const data = await response.json();
            setMerchants(data);
        } catch (error) {
            console.error("Error fetching merchants. Is backend running?", error);
        }
    };

    useEffect(() => {
        fetchMerchants();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this merchant?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/merchants/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Merchant deleted!');
                fetchMerchants();
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                    <th>ID</th><th>Name</th><th>Category</th><th>Manufacturer ID</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 ? products.map(p => (
                    <tr key={p.productid}>
                        <td>{p.productid}</td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.manufid}</td>
                        <td>
                            <button onClick={() => onEdit(p)} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Edit</button>
                            <button onClick={() => handleDelete(p.productid)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </td>
                    </tr>
                )) : <tr><td colSpan="5">No manufacturers found or backend is not connected yet.</td></tr>}
            </tbody>
        </table>
    );
}

export default MerchantList;
