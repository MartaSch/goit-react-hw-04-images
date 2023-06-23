import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ModalImage.module.css';

export default function ModalImage({ imgUrl, onClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.target) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackdrop} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
}

ModalImage.propTypes = {
  onClose: PropTypes.func.isRequired,
};
