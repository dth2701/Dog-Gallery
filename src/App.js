import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Gallery from './Gallery';
import './App.css';

function App() {
  return (
    // Wrap the entire app in the BrowserRouter to enable routing.
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the homepage which renders the SelectBreeds component. */}
          <Route path="/" element={<SelectBreeds />} />
          {/*  Route for the gallery page which renders the Gallery component. */}
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

// Component to select the breeds of dogs.
function SelectBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  // Hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Fetching the list of dog breeds when the component mounts.
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        // Set the breeds state to the list of breeds fetched from the API.
        setBreeds(Object.keys(data.message));
      })
      .catch(error => {

        console.error("Error fetching the dog breeds:", error);
      });
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts.

  // Handler for checkbox changes to select or deselect breeds.
  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBreeds(prev => 
      checked ? [...prev, value] : prev.filter(breed => breed !== value)
    );
  };

  // Handler for the submit button to navigate to the gallery with the selected breeds.
  const handleSubmit = () => {
    navigate("/gallery", { state: { breeds: selectedBreeds } });
  };

  return (
    // Container for the breed selection UI.
    <div className="selection-container">
      <h1>Welcome to Dog Gallery!</h1>
      <p>Select your favorite breeds and enjoy a gallery tailored just for you.</p>
      {/* // Render a list of checkboxes for each breed. */}
      <div className="breeds-container">
        {breeds.map(breed => (
          <label key={breed} className="breed-label">
            <input type="checkbox" value={breed} onChange={handleChange} />
            {breed}
          </label>
        ))}
      </div>
      {/* // Submit button to navigate to the gallery. */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;