import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  takeLargeImage,
  tags,
}) => {
  return (
    <>
      <li
        className={styles.ImageGalleryItem}
        onClick={() => takeLargeImage(largeImageURL)}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  takeLargeImage: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
