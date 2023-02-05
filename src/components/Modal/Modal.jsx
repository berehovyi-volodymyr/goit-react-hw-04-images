import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImage, close }) => {
  const closeModal = useCallback(({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={styles.Overlay} onClick={closeModal}>
      <div className={styles.Modal}>
        <img src={largeImage} alt="bigImage" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
