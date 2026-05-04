import React, { useState, useEffect } from 'react';

function MerchProdList({ onEdit }) {
    const [merchprods, setMerchProds] = useState([]);

    const fetchMerchProds = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/merchprod');
            const data = await response.json();
            setMerchProds(data);
        } catch (error) {
            console.error("Error fetching merchprod:", error);
        }
    };

    useEffect(() => {
        fetchMerchProds();
    }, []);

    const handleDelete = async (merchantid, productid) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        try {
            await fetch(`http://localhost:5000/api/merchprod/${merchantid}/${productid}`, { method: 'DELETE' });
            fetchMerchProds();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                    <th>Merchant</th><th>Product</th><th>Price</th><th>Promotion</th><th>Shipping</th><th>Available</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {merchprods.length > 0 ? merchprods.map((mp, i) => (
                    <tr key={i}>
                        <td>{mp.merchantname}</td>
                        <td>{mp.productname}</td>
                        <td>${mp.price}</td>
                        <td>{mp.promotion || 'None'}</td>
                        <td>${mp.shipping}</td>
                        <td>{mp.availability ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => onEdit(mp)} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Edit</button>
                            <button onClick={() => handleDelete(mp.merchantid, mp.productid)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </td>
                    </tr>
                )) : <tr><td colSpan="7">No entries found.</td></tr>}
            </tbody>
        </table>
    );
}

export default MerchProdList;