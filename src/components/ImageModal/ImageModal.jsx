import React, { useEffect } from 'react';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  useEffect(() => {
    // Обробник натискання клавіш
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    // Додаємо слухача подій при відкритті модального вікна
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Видаляємо слухача подій при закритті модального вікна
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onRequestClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Large view" />
      </div>
    </div>
  );
};

export default ImageModal;
