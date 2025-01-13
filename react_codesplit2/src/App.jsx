import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatabaseTodos from './pages/DatabaseTodos';
import LocalStorageTodos from './pages/LocalStorageTodos';
import Navbar from './components/Navbar'; // Import Navbar
import { Toaster } from 'react-hot-toast'
import InfiniteScroll from './pages/InfiniteScroll'
import SWRInfiniteScroll from './pages/SWRInfiniteScroll'
import Test from './pages/Test'

export default function App() {
  return (
    <Router>
      <div>
        <Toaster/>
        <Navbar /> {/* Add Navbar */}
        <Routes>
          <Route path="/" element={<DatabaseTodos />} />
          <Route path="/localstorage" element={<LocalStorageTodos />} />
          <Route path="/scroll" element={<InfiniteScroll />} />
          <Route path="/swr" element={<SWRInfiniteScroll />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}
