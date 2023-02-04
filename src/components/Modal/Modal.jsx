import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { largeImage } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.closeModal}>
        <div className={styles.Modal}>
          <img src={largeImage} alt="bigImage" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
