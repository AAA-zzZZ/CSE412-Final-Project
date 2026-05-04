import React, { useState } from 'react';

function MerchProdForm({ mode, initialData, onSuccess }) {
    const [merchantid, setMerchantid] = useState(initialData ? initialData.merchantid : '');
    const [productid, setProductid] = useState(initialData ? initialData.productid : '');
    const [price, setPrice] = useState(initialData ? initialData.price : '');
    const [promotion, setPromotion] = useState(initialData ? initialData.promotion : '');
    const [shipping, setShipping] = useState(initialData ? initialData.shipping : '');
    const [availability, setAvailability] = useState(initialData ? initialData.availability : true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mpData = { merchantid, productid, price, promotion, shipping, availability };

        const endpoint = mode === 'add'
            ? 'http://localhost:5000/api/merchprod'
            : `http://localhost:5000/api/merchprod/${initialData.merchantid}/${initialData.productid}`;

        const method = mode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mpData),
            });
            if (response.ok) {
                alert(`Entry ${mode === 'add' ? 'Added' : 'Updated'} Successfully!`);
                onSuccess();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
            <h2>{mode === 'add' ? 'Add Merchant Product' : 'Update Merchant Product'}</h2>
            <label>Merchant ID</label>
            <input type="number" value={merchantid} onChange={e => setMerchantid(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Product ID</label>
            <input type="number" value={productid} onChange={e => setProductid(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Price</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Promotion</label>
            <input value={promotion} onChange={e => setPromotion(e.target.value)} style={{ marginBottom: '10px' }}/>
            <label>Shipping Cost</label>
            <input type="number" step="0.01" value={shipping} onChange={e => setShipping(e.target.value)} required style={{ marginBottom: '10px' }}/>
            <label>Available</label>
            <select value={availability} onChange={e => setAvailability(e.target.value === 'true')} style={{ marginBottom: '20px' }}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                {mode === 'add' ? 'Add Entry' : 'Save Changes'}
            </button>
        </form>
    );
}

export default MerchProdForm;