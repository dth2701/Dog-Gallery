import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  // Hook to programmatically navigate between routes.
  const navigate = useNavigate();

  const handleGetListBreeds = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        // Set the breeds state to the list of breeds fetched from the API.
        setBreeds(Object.keys(data.message));
      })
      .catch(error => {

        console.error("Error fetching the dog breeds:", error);
      });
  }

  // Fetching the list of dog breeds when the component mounts.
  useEffect(() => {
    handleGetListBreeds()
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
          <label 
            key={breed} 
            className={`breed-label ${selectedBreeds.includes(breed) ? 'breed-label-selected' : ''}`}
            >
            <input class="breed-label"
              type="checkbox" 
              value={breed} 
              onChange={handleChange} 
              checked={selectedBreeds.includes(breed)}
            />
            <span>{breed}</span>
          </label>
        ))}
      </div>
      {/* // Submit button to navigate to the gallery. */}
      <button
        style={{
          cursor: selectedBreeds.length === 0 ? "not-allowed" : "pointer"
        }}
        disabled={selectedBreeds.length === 0}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default SelectBreeds