import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import styles from './searchbar.module.css';
import { useState, memo } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!search.trim()) {
      return alert('Please input your query');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <>
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <GoSearch color="black" size="20px" />
          </button>

          <input
            className={styles.SearchFormInput}
            name="search"
            value={search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
