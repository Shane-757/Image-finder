import React, { useState } from 'react';
import axios from 'axios';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import '../styles.css'; 

const PixabayAPIKey = '34086149-ce97166a0a74463c53bfd7508';

const ImageGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleSearchSubmit = async query => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=1&key=${PixabayAPIKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(response.data.hits);
      setSearchQuery(query);
    } catch (error) {
      console.error('Error fetching images from Pixabay:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = Math.ceil(images.length / 12) + 1;
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${nextPage}&key=${PixabayAPIKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(prevImages => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching more images from Pixabay:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = image => {
    const selectedIndex = images.findIndex(img => img.id === image.id);
    setSelectedImageIndex(selectedIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ul className="ImageGallery">
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
            ))}
          </ul>
          {images.length > 0 && <Button onClick={handleLoadMore} />}
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

export default ImageGallery;