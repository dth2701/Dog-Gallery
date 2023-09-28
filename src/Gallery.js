import './Gallery.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// The main Gallery component that displays the selected breeds.
function Gallery() {
    const [dogImages, setDogImages] = useState([]);
    const location = useLocation();
    // Retrieve the selected breeds from the location state, or default to an empty array.
    const selectedBreeds = location.state ? location.state.breeds : [];

    // Effect hook to fetch dog images for the selected breeds when the component mounts or selectedBreeds change.
    useEffect(() => {
        // Asynchronous function to fetch dog images.
        async function fetchDogImages() {
            // Array to hold fetched images.
            const fetchedImages = [];

            // Iterate over each selected breed to fetch its image.
            for (let breed of selectedBreeds) {
                try {
                    // Make an API request to get a random image for the current breed.
                    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                    const data = await response.json();

                    // If the API request is successful, push the breed and image URL to the fetchedImages array.
                    if (data.status === 'success') {
                        fetchedImages.push({ breed, imageUrl: data.message });
                    }
                } catch (error) {
                    console.error("Error fetching image for breed:", breed);
                }
            }

            // Update the dogImages state with the fetched images.
            setDogImages(fetchedImages);
        }

        // Invoke the fetchDogImages function.
        fetchDogImages();
    }, [selectedBreeds]);  // Dependency array ensures this effect runs when selectedBreeds changes.

    // Render the gallery of dog images.
    return (
        <div className="gallery-container">
            {dogImages.map((dog, index) => (
                <div key={index} className="dog-container">
                    <h2>{dog.breed}</h2>
                    <img src={dog.imageUrl} alt={dog.breed} />
                </div>
            ))}
        </div>
    );
}

export default Gallery;