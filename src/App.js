import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchImages } from "./services/unsplashApi";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Для повідомлення про помилку

  // Fetch images from API
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(""); // Скидаємо помилку перед новим запитом
      const data = await fetchImages(query, page);
      if (data.length === 0 && page === 1) {
        setErrorMessage("No images found. Try another query."); // Порожній результат
      }
      setImages((prevImages) => [...prevImages, ...data]);
      setLoading(false);
    };
    fetchData();
  }, [query, page]);

  // Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.trim();
    if (!newQuery) {
      setErrorMessage("Please enter a valid search query.");
      return;
    }
    setImages([]);
    setPage(1);
    setQuery(newQuery);
    setErrorMessage(""); // Скидаємо попереднє повідомлення про помилку
  };

  // Modal Handlers
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <header className="header">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search images..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="gallery-image"
            onClick={() => openModal(image.urls.regular)}
          />
        ))}
      </div>

      {loading && <div className="loader">Loading...</div>}

      {images.length > 0 && !loading && (
        <button className="load-more" onClick={() => setPage(page + 1)}>
          Load More
        </button>
      )}

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedImage && (
          <img src={selectedImage} alt="Large Preview" className="modal-image" />
        )}
      </Modal>
    </div>
  );
}

export default App;
