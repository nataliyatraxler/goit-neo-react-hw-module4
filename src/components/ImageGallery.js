import React from 'react';

const ImageGallery = ({ images, onImageClick, lastImageRef }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => {
        const isLastImage = index === images.length - 1;
        return (
          <li key={image.id} style={{ margin: '10px' }} ref={isLastImage ? lastImageRef : null}>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              style={{ width: '200px', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => onImageClick(image.urls.regular)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
