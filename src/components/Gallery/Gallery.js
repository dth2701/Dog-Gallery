import './Gallery.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Gallery() {
    const [dogImages, setDogImages] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the selected breeds from the location state, or default to an empty array.
    const selectedBreeds = location.state ? location.state.breeds : [];

    // Effect hook to fetch dog images for the selected breeds when the component mounts or selectedBreeds change.
    useEffect(() => {
        // Asynchronous function to fetch dog images.
        async function fetchDogImages() {
            // Array to hold fetched images.
            const fetchedImages = [];
            setLoadingImage(true)
            // Iterate over each selected breed to fetch its image.
            for (let breed of selectedBreeds) {
                try {
                    // Make an API request to get a random image for the current breed.
                    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                    const data = await response.json();
                    console.log(data)

                    // If the API request is successful, push the breed and image URL to the fetchedImages array.
                    if (data.status === 'success') {
                        fetchedImages.push({ breed, imageUrl: data.message });
                    }
                } catch (error) {
                    console.error("Error fetching image for breed:", breed);
                }
            }
            setLoadingImage(false)
            // Update the dogImages state with the fetched images.
            setDogImages(fetchedImages);
        }

        // Invoke the fetchDogImages function.
        fetchDogImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loadingImage) {
        return (
            <div className='loading-img'>
                <span class="loader"></span>
            </div>
        )
    }

    // Render the gallery of dog images.
    return (
        <div className='main-wrapper'>
            <button onClick={() => {navigate('/Dog-Gallery')}}>Back</button>
            <div className='main-container'>
                <div className="gallery-container">
                    {dogImages.map((dog, index) => (
                        <div className="dog-item-wrapper" key={dog?.id}>
                            <div className="dog-item">
                                <img className="dog-image" src={dog.imageUrl} alt={dog.breed} />
                                <div className="dog-content">
                                    <h3 className="dog-name">{dog.breed}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;