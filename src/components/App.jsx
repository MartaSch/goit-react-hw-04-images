import { useEffect, useState } from 'react';
import css from './App.module.css';
import ImagesList from './ImageList/ImagesList';
import fetchImagesWithQuery from 'services/api';
import { nanoid } from 'nanoid';
import Searchbar from './Searchbar/Searchbar';
import ModalImage from './ModalImage/ModalImage';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export default function App() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  useEffect(() => {
    if (q !== '') {
      getImages(q, page);
    }
  }, [q, page]);

  const handleSubmitSearch = newQuery => {
    if (newQuery.trim() === '') {
      alert('Please, fill in the search field!');
      return;
    }
    setQ(newQuery);
    setPage(1);
    setItems([]);
  };

  const getImages = async (q, page) => {
    try {
      setIsLoading({
        isLoading: true,
      });
      const images = await fetchImagesWithQuery(q, page);
      setItems(prevState => [...prevState, ...images]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.Container}>
      <Searchbar
        query={q}
        inputId={nanoid()}
        onSubmit={handleSubmitSearch}
        isLoading={isLoading}
      />
      {largeImageUrl && (
        <ModalImage
          imgUrl={largeImageUrl}
          onClose={() => setLargeImageUrl('')}
        />
      )}
      <ImagesList items={items} onClick={setLargeImageUrl} />
      {isLoading && <Loader />}
      {items.length > 0 && (
        <Button onClick={onClick} isLoading={isLoading} label={'Load more'} />
      )}
    </div>
  );
}
