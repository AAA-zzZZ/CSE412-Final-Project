import React, { useState } from 'react';

function ProductForm({ mode, initialData, onSuccess }) {

    const [name, setName] = useState(initialData ? initialData.name : '');
    const [category, setCategory] = useState(initialData ? initialData.category : '');
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [manufid, setManufId] = useState(initialData ? initialData.manufid : 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, category, description, manufid };

        const url = mode === 'add' 
            ? 'http://localhost:5000/api/products' 
            : `http://localhost:5000/api/products/${initialData.productid}`;
            
        const method = mode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert(`Product ${mode === 'add' ? 'Added' : 'Updated'} Successfully!`);
                onSuccess();
            } else {
                alert('Database operation failed.');
            }
        } catch (error) {
            console.error(`Error ${mode}ing product:`, error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
            <h2>{mode === 'add' ? 'Create New Product' : 'Update Product'}</h2>
            
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ marginBottom: '10px' }}/>

            <label>Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} required style={{ marginBottom: '10px' }}/>

            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ marginBottom: '10px' }}/>

            <label>Manufacturer ID</label>
            <input type="number" value={manufid} onChange={e => setManufId(e.target.value)} required style={{ marginBottom: '20px' }}/>

            <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                {mode === 'add' ? 'Submit New Product' : 'Save Changes'}
            </button>
        </form>
    );
}

export default ProductForm;
