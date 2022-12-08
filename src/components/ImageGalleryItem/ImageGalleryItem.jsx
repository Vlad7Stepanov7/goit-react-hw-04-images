import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import React, { Component } from "react";
import Modal from "components/Modal";
import PropTypes from 'prop-types';





class ImageGalleryItem extends Component {
    state = {
        isShowModal: false
    }

     handleToggleModal = () => {
        this.setState(({ isShowModal }) => ({
            isShowModal: !isShowModal
        }));
    }
   
    render() {
    const { image } = this.props;
    const { webformatURL, largeImageURL, tags } = image;
    const { isShowModal } = this.state;
        
   return <>
        <GalleryItem onClick={this.handleToggleModal}>
            <GalleryItemImage src={webformatURL} alt={tags} />
       </GalleryItem>

       {isShowModal && <Modal onClick={this.handleToggleModal}><img src={largeImageURL} alt={tags} /></Modal>}
    </>
};
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
         webformatURL: PropTypes.string.isRequired,
     largeImageURL: PropTypes.string.isRequired,
     tags: PropTypes.string.isRequired,
    }),
     
}

export default ImageGalleryItem; 