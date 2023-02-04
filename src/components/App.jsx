import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { searchImage } from './api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: '',
    totalHitsForPage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page } = this.state;
    try {
      this.setState({ loading: true });
      const { hits } = await searchImage(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHitsForPage: hits.length,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLagreImage = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  render() {
    const { items, loading, error, showModal, largeImage, totalHitsForPage } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} />
        {loading && <Loader />}
        {error && <p>Error, please try again later</p>}
        <ImageGallery items={items} takeLargeImage={this.showLagreImage} />
        {Boolean(items.length && totalHitsForPage >= 12) && (
          <Button onClick={this.loadMore} />
        )}
        {showModal && <Modal largeImage={largeImage} close={this.closeModal} />}
      </>
    );
  }
}
