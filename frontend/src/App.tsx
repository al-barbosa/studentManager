import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
