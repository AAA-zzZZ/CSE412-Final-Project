import React, { useState } from 'react';

function MerchantForm({ mode, initialData, onSuccess }) {
    const [name, setName] = useState(initialData ? initialData.name : '');
    const [url, setUrl] = useState(initialData ? initialData.url : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const merchantData = { name, url };

        const endpoint = mode === 'add'
            ? 'http://localhost:5000/api/merchants'
            : `http://localhost:5000/api/merchants/${initialData.merchantid}`;

        const method = mode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(merchantData),
            });
            if (response.ok) {
                alert(`Merchant ${mode === 'add' ? 'Added' : 'Updated'} Successfully!`);
                onSuccess();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
            <h2>{mode === 'add' ? 'Add New Merchant' : 'Update Merchant'}</h2>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} required style={{ marginBottom: '20px' }}/>
            <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                {mode === 'add' ? 'Add Merchant' : 'Save Changes'}
            </button>
        </form>
    );
}

export default MerchantForm;