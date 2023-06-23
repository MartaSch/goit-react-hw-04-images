import PropTypes from 'prop-types';
import css from './Button.module.css';

const LoadMoreButton = ({ label, onClick }) => {
  return (
    <button type="button" className={css.LoadMoreButton} onClick={onClick}>
      {label}
    </button>
  );
};

LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func,
};

export default LoadMoreButton;
