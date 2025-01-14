import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatabaseTodos from './pages/DatabaseTodos';
import LocalStorageTodos from './pages/LocalStorageTodos';
import Navbar from './components/Header/Navbar'; // Import Navbar
import { Toaster } from 'react-hot-toast'
import InfiniteScroll from './pages/InfiniteScroll'
import SWRInfiniteScroll from './pages/SWRInfiniteScroll'
import Test from './pages/Test'
import Test2 from './pages/Test2'
import Test3 from './pages/Test3'

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
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />
        </Routes>
      </div>
    </Router>
  );
}
