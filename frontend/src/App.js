import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [productToEdit, setProductToEdit] = useState(null);

  const goToAdd = () => setCurrentView('add');
  const goToList = () => setCurrentView('list');
  const goToEdit = (product) => {
    setProductToEdit(product);
    setCurrentView('edit');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Database Project: Product Manager</h1>
      
      {currentView === 'list' && (
        <>
          <button onClick={goToAdd} style={{ padding: '10px', marginBottom: '20px', backgroundColor: 'green', color: 'white' }}>
            + Add New Product
          </button>
          <ProductList onEdit={goToEdit} />
        </>
      )}

      {currentView === 'add' && (
        <>
          <button onClick={goToList} style={{ padding: '5px', marginBottom: '20px' }}>← Back to List</button>
          <ProductForm mode="add" onSuccess={goToList} />
        </>
      )}

      {currentView === 'edit' && (
        <>
          <button onClick={goToList} style={{ padding: '5px', marginBottom: '20px' }}>← Back to List</button>
          <ProductForm mode="edit" initialData={productToEdit} onSuccess={goToList} />
        </>
      )}
    </div>
  );
}

export default App;