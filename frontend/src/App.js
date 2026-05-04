import React, { useState } from 'react';
import './App.css';

import ProductList from './ProductList';
import UserList from './UserList';
import MerchantList from './MerchantList';
import RatingsList from './RatingsList';
import MerchProdList from './MerchProdList';

import ProductForm from './ProductForm';
import UserForm from './UserForm';
import MerchantForm from './MerchantForm';
import RatingsForm from './RatingsForm';
import MerchProdForm from './MerchProdForm';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [editingItem, setEditingItem] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setEditingItem(null); 
  };

  const renderContent = () => {
    if (editingItem) {
      const goBack = () => setEditingItem(null);

      switch (activeTab) {
        case 'products': return <ProductForm mode="edit" initialData={editingItem} onSuccess={goBack} />;
        case 'users': return <UserForm mode="edit" initialData={editingItem} onSuccess={goBack} />;
        case 'merchants': return <MerchantForm mode="edit" initialData={editingItem} onSuccess={goBack} />;
        case 'ratings': return <RatingsForm mode="edit" initialData={editingItem} onSuccess={goBack} />;
        case 'merchprod': return <MerchProdForm mode="edit" initialData={editingItem} onSuccess={goBack} />;
        default: return <p>Form not found.</p>;
      }
    }

    switch (activeTab) {
      case 'products': return <ProductList onEdit={setEditingItem} />;
      case 'users': return <UserList onEdit={setEditingItem} />;
      case 'merchants': return <MerchantList onEdit={setEditingItem} />;
      case 'ratings': return <RatingsList onEdit={setEditingItem} />;
      case 'merchprod': return <MerchProdList onEdit={setEditingItem} />;
      default: return <ProductList onEdit={setEditingItem} />;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CSE 412 Database Manager</h1>
      
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => handleTabClick('products')} style={buttonStyle(activeTab, 'products')}>Products</button>
        <button onClick={() => handleTabClick('users')} style={buttonStyle(activeTab, 'users')}>Users</button>
        <button onClick={() => handleTabClick('merchants')} style={buttonStyle(activeTab, 'merchants')}>Merchants</button>
        <button onClick={() => handleTabClick('ratings')} style={buttonStyle(activeTab, 'ratings')}>Ratings</button>
        <button onClick={() => handleTabClick('merchprod')} style={buttonStyle(activeTab, 'merchprod')}>Merchant Listings</button>
      </nav>

      <hr style={{ marginBottom: '20px' }} />

      {editingItem && (
        <button onClick={() => setEditingItem(null)} style={{ marginBottom: '20px', padding: '5px' }}>
          ← Cancel Edit
        </button>
      )}

      {renderContent()}
    </div>
  );
}

const buttonStyle = (activeTab, tabName) => ({
  padding: '10px 15px',
  cursor: 'pointer',
  backgroundColor: activeTab === tabName ? '#0056b3' : '#e0e0e0',
  color: activeTab === tabName ? 'white' : 'black',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
});

export default App;
