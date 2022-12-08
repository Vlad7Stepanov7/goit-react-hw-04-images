import Box from "components/Box";
import React, { Component } from "react";
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

export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    currentSearch: "",
    status: "idle",
    isShowLoadMore: true
  }

  async componentDidUpdate(_, prevState) {
    const { currentSearch, page } = this.state;

    if (currentSearch !== prevState.currentSearch || page !== prevState.page) {
      try {
        
      this.setState({ status: "pending" });

      const data = await getImages(currentSearch, page);
      
      const images = await data.hits;
        
      if (images.length === 0) {
        return this.notifyWarningInput();
      }
      
      if (!this.isThereImages(data.totalHits, page)) {
        this.setState({ isShowLoadMore: false })
        this.notifyInfo();
       }
     
      this.setState(({gallery}) => ({
        gallery: [...gallery, ...images],
        status: "resolved"
      }))
        
      } catch (error) {
        this.setState({status: "rejected"})
        this.notifyError(error);
      }
    }
  }

  handleFormSubmit = value => {
    this.setState({
      currentSearch: value,
      page: 1,
      gallery: [], 
      isShowLoadMore: true
    })
  }
   
  handleLoadMore = () => { 
    this.setState(({ page }) => ({
        page: page + 1,
      }))
  }
  
  notifyWarningEmptyField = () => toast.warning("You can't leave an empty field");

  notifyWarningInput = () => toast.warning("Please enter a valid name");

  notifyInfo = () => toast.info("No more images");

  notifyError = (error) => {
    toast.error("Error, Something went wrong")
    console.log(error);
  }
  
  isThereImages(total, page, perPage = 14) {
    const totalPages = Math.ceil(total / perPage);
    
    return page < totalPages;
  }
  
  render() {
    const { gallery, status, isShowLoadMore } = this.state;
    
    return <Box
     display="grid"
     gridTemplateColumns="1fr"
     gridGap="16px"
     paddingBottom="24px"
    >
      
      <Searchbar onSubmit={this.handleFormSubmit} notify={this.notifyWarningEmptyField} />

      {gallery.length !== 0 &&
        <ImageGallery status={status} onClickLoadMore={this.handleLoadMore} isShowLoadMore={isShowLoadMore} >
           {gallery.map(image =>
                  < ImageGalleryItem
                      key={image.id}
                      image={image}
                       />
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
    </Box>
  };
};
