import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import { useState } from "react";
import Modal from "components/Modal";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
    const [isShowModal, setIsShowModal] = useState(false)
 
    const handleToggleModal = () => {
        setIsShowModal(!isShowModal);
    }
        
   return <>
        <GalleryItem onClick={handleToggleModal}>
            <GalleryItemImage src={webformatURL} alt={tags} />
       </GalleryItem>

       {isShowModal && <Modal onClick={handleToggleModal}><img src={largeImageURL} alt={tags} /></Modal>}
    </>
};


ImageGalleryItem.propTypes = {  
         webformatURL: PropTypes.string.isRequired,
     largeImageURL: PropTypes.string.isRequired,
     tags: PropTypes.string.isRequired,   
}

export default ImageGalleryItem; 