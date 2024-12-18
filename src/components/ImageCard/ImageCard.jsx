import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(image.urls.regular)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
