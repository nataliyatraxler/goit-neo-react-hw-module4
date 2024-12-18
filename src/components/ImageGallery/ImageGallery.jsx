import React from 'react';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.galleryItem}
          onClick={() => onImageClick(image.urls.regular)} // Передаємо image.urls.regular
        >
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className={styles.galleryImage}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
