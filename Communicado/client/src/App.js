import React from 'react';
import Dashboard from './components/Dashboard'
import Chat from './components/Chat'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>     
    </div>
  );
}

export default App;
