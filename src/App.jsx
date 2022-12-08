import Box from "components/Box";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "components/ImageGallery";
import ImageGalleryItem from "components/ImageGalleryItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from "utils/API";

//idle
//pending
//rejected
//resolved

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [currentSearch, setCurentSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [isShowLoadMore, setIsShowLoadMore] = useState(true);
 
  useEffect(() => {
    if (currentSearch === '') {
      return
    }

    const fetchImages = async () => {
      const data = await getImages(currentSearch, page);
      const images = await data.hits;
    
      if (images.length === 0) {
        return notifyWarningInput();
      }

      if (!isThereImages(data.totalHits, page)) {
        setIsShowLoadMore(false);
        notifyInfo();
      }

      setGallery(prevGallery => [...prevGallery, ...images]);
      setStatus("resolved");
    }
    try {     
        fetchImages();
      
      } catch (error) {
        setStatus("rejected");
        notifyError(error);
      }
    }, [currentSearch, page])


  const handleFormSubmit = value => {
    setCurentSearch(value);
    setPage(1);
    setGallery([]);
    setIsShowLoadMore(true);
  }
   
  const handleLoadMore = () => { 
    setPage(prevPage => prevPage + 1)
  }
  
  const notifyWarningEmptyField = () => toast.warning("You can't leave an empty field");

  const notifyWarningInput = () => toast.warning("Please enter a valid name");

  const notifyInfo = () => toast.info("No more images");

  const notifyError = (error) => {
    toast.error("Error, Something went wrong")
    console.log(error);
  }
  
  const isThereImages = (total, page, perPage = 14) => {
    const totalPages = Math.ceil(total / perPage);
    
    return page < totalPages;
  }
    
  return (
    <Box
     display="grid"
     gridTemplateColumns="1fr"
     gridGap="16px"
     paddingBottom="24px"
    >
      
      <Searchbar onSubmit={handleFormSubmit} notify={notifyWarningEmptyField} />

      {gallery.length !== 0 &&
        <ImageGallery status={status} onClickLoadMore={handleLoadMore} isShowLoadMore={isShowLoadMore} >
           {gallery.map(image => {
                return  < ImageGalleryItem
                      key={image.id}
                      webformatURL={image.webformatURL}
                      largeImageURL={image.largeImageURL}
                      tags={image.tags}
                       />
           }
          
                )}
        </ImageGallery>}
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </Box>)
  };
