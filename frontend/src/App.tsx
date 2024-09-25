import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PictureList from './components/PictureList';
import Profile from './components/Lodar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PictureList/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;
