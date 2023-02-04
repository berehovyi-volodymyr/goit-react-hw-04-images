import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.Button}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
