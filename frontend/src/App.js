import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import UserList from './UserList';
import MerchantList from './MerchantList';
import RatingsList from './RatingsList';
import MerchProdList from './MerchProdList';

function App() {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return <ProductList />;
      case 'users': return <UserList />;
      case 'merchants': return <MerchantList />;
      case 'ratings': return <RatingsList />;
      case 'merchprod': return <MerchProdList />;
      default: return <ProductList />;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CSE 412 Database Manager</h1>

      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('products')} style={buttonStyle(activeTab, 'products')}>Products</button>
        <button onClick={() => setActiveTab('users')} style={buttonStyle(activeTab, 'users')}>Users</button>
        <button onClick={() => setActiveTab('merchants')} style={buttonStyle(activeTab, 'merchants')}>Merchants</button>
        <button onClick={() => setActiveTab('ratings')} style={buttonStyle(activeTab, 'ratings')}>Ratings</button>
        <button onClick={() => setActiveTab('merchprod')} style={buttonStyle(activeTab, 'merchprod')}>Merchant Listings</button>
      </nav>
      <hr style={{ marginBottom: '20px' }} />
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
