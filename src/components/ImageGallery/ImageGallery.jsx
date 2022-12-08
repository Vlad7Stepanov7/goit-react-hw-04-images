import { Gallery } from "./ImageGallery.styled";
import Button from "components/Button";
import Loader from "components/Loader";
import PropTypes from 'prop-types';

const ImageGallery = ({status, onClickLoadMore, children, isShowLoadMore}) => {
 
    return (
        <>
        <Gallery>  
            {children}    
        </Gallery>
          
            {status === "pending" && <Loader />}
            {status === "resolved" && isShowLoadMore && <Button onClick={onClickLoadMore} />}
        </>
    );
}

ImageGallery.propTypes = {
    status: PropTypes.string.isRequired,
    onClickLoadMore: PropTypes.func.isRequired
}

export default ImageGallery;

      