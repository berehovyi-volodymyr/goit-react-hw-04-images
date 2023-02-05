import { useState, useEffect, useCallback } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { searchImage } from './api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [totalHitsForPage, setTotalHitsForPage] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const { hits } = await searchImage(search, page);
          setItems(prevItems => [...prevItems, ...hits]);
          setTotalHitsForPage(hits.length);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const searchImages = useCallback(search => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showLagreImage = useCallback(image => {
    setLargeImage(image);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setLargeImage('');
    setShowModal(false);
  }, []);

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {loading && <Loader />}
      {error && <p>Error, please try again later</p>}
      <ImageGallery items={items} takeLargeImage={showLagreImage} />
      {Boolean(items.length && totalHitsForPage >= 12) && (
        <Button onClick={loadMore} />
      )}
      {showModal && <Modal largeImage={largeImage} close={closeModal} />}
    </>
  );
};
