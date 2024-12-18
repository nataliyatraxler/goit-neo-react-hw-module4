import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './services/unsplashApi';
import styles from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') {
      setError('Please enter a valid search query');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError('');
    setNoResults(false);
  };

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError('');
      setNoResults(false);

      try {
        const data = await fetchImages(query, page);
        if (data.length === 0) {
          setNoResults(true);
        } else {
          setImages((prev) => [...prev, ...data]);
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {noResults && <ErrorMessage message="No results found. Try another query." />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={() => setPage(page + 1)} />}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
