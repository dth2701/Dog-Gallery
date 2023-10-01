import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectBreeds from './components/SelectBreeds/SelectBreeds'
import Gallery from './components/Gallery/Gallery';
import Login from './components/Login/Login';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    // Wrap the entire app in the BrowserRouter to enable routing.
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />}/>
          {/* Route for the homepage which renders the SelectBreeds component. */}
          <Route path="/Dog-Gallery" element={<SelectBreeds />} />
          {/*  Route for the gallery page which renders the Gallery component. */}
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;