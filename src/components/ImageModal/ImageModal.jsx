import React from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div>
        <img src={imageUrl} alt="Selected" className={styles.modalImage} />
      </div>
    </ReactModal>
  );
};

export default ImageModal;
