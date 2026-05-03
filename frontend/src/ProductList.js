import React, { useState, useEffect } from 'react';

function ProductList({ onEdit }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products. Is backend running?", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Product deleted!');
                fetchProducts();
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
                )) : <tr><td colSpan="5">No products found or backend is not connected yet.</td></tr>}
            </tbody>
        </table>
    );
}

export default ProductList;
