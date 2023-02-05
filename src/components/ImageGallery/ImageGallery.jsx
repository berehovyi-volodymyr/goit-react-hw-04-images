import PropTypes from 'prop-types';
import styles from './imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { memo } from 'react';

const ImageGallery = ({ items, takeLargeImage }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          takeLargeImage={takeLargeImage}
          tags={tags}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};

export default memo(ImageGallery);

ImageGallery.propTypes = {
  takeLargeImage: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
