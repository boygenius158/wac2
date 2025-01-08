import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DatabaseTodos from './pages/DatabaseTodos';
import LocalStorageTodos from './pages/LocalStorageTodos';
import Navbar from './components/Navbar'; // Import Navbar
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <Router>
      <div>
        <Toaster/>
        <Navbar /> {/* Add Navbar */}
        <Routes>
          <Route path="/" element={<DatabaseTodos />} />
          <Route path="/localstorage" element={<LocalStorageTodos />} />
        </Routes>
      </div>
    </Router>
  );
}
