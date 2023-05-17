import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import '../styles.css';

const PixabayAPIKey = '34086149-ce97166a0a74463c53bfd7508';

const ImageGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(20);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    setHasReachedEnd(images.length === totalHits);
  }, [images, totalHits]);

  const handleSearchSubmit = async (query, dropdownValue) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=1&key=${PixabayAPIKey}&image_type=photo&orientation=horizontal&per_page=${dropdownValue}`
      );

      const { hits, totalHits } = response.data;

      if (hits.length === 0) {
        Notiflix.Notify.warning('No images found. Please try a different search query.');
        return;
      }
      for (let i = 0; i < hits.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5));
      }

      setImages(hits);
      setSearchQuery(query);
      setTotalHits(totalHits);
      Notiflix.Notify.success(`${totalHits} images available for '${query}'`);
    } catch (error) {
      console.error('Error fetching images from Pixabay:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = Math.ceil(images.length / selectedDropdownValue) + 1;
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${nextPage}&key=${PixabayAPIKey}&image_type=photo&orientation=horizontal&per_page=${selectedDropdownValue}`
      );

      const { hits, totalHits } = response.data;

      if (hits.length === 0) {
        Notiflix.Notify.warning('You have reached the end of the available images.');
        setHasReachedEnd(true);
        return;
      }
      for (let i = 0; i < hits.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      setImages((prevImages) => [...prevImages, ...hits]);
      setHasReachedEnd(images.length + hits.length === totalHits);
      if (images.length + hits.length === totalHits) {
        Notiflix.Notify.warning('You have reached the end of the available images.');
      } else {
        const loadedCount = images.length + hits.length;
        Notiflix.Notify.info(`Loaded ${loadedCount} images out of ${totalHits}`);
      }
     } catch (error) {
      console.error('Error fetching more images from Pixabay:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    const selectedIndex = images.findIndex((img) => img.id === image.id);
    setSelectedImageIndex(selectedIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} onDropdownChange={setSelectedDropdownValue} />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ul className="ImageGallery">
            {images.map((image) => (
              <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
            ))}
          </ul>
          {!hasReachedEnd && images.length > 0 && <Button onClick={handleLoadMore} />}
          {selectedImageIndex !== null && (
            <Modal
              images={images}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              onClose={closeModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
images: PropTypes.arrayOf(PropTypes.object),
selectedImageIndex: PropTypes.number,
setSelectedImageIndex: PropTypes.func,
onClose: PropTypes.func,
};


export default ImageGallery;