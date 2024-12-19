import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ReactModal from 'react-modal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './services/unsplashApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

ReactModal.setAppElement('#root');

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
      toast.error('Please enter a valid search query');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError('');
    setNoResults(false);
    toast.info(`Searching for "${newQuery}"`);
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
          toast.warn('No results found. Try another query.');
        } else {
          setImages((prev) => [...prev, ...data]);
          toast.success(`${data.length} images loaded.`);
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        toast.error('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <ToastContainer position="top-right" autoClose={3000} />
      {error && <ErrorMessage message={error} />}
      {noResults && <ErrorMessage message="No results found. Try another query." />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={() => setPage(page + 1)} />}
      <ReactModal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedImage && <img src={selectedImage} alt="Selected" className={styles.modalImage} />}
      </ReactModal>
    </div>
  );
};

export default App;