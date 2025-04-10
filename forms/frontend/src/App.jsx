import React from 'react';
import Form from './components/Form';
import './App.css'; // Optional styling

function App() {
  return (
    <div className="app">
      <h1>React Form with PostgreSQL</h1>
      <Form /> {/* Render your form component */}
    </div>
  );
}

export default App;