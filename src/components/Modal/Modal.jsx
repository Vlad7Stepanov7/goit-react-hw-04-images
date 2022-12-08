import { Overlay, ModalImage } from "./Modal.styled"
import { createPortal } from "react-dom";
import React, { Component } from "react";

const modalRoot = document.querySelector(`#modal-root`);

class Modal extends Component {
    componentDidMount() {
        window.addEventListener(`keydown`, this.handleKeyDown);
    }

    componentWillUnmount() {
      window.removeEventListener(`keydown`, this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === `Escape`) {
           this.props.onClick();
        }
    }

    handleCloseBackdrop = e => {
        if (e.currentTarget === e.target) {
            this.props.onClick();
        }
    }

    render() {
        const { children } = this.props;

    return createPortal(
        <Overlay onClick={this.handleCloseBackdrop}>
            <ModalImage>
                {children}
            </ModalImage>
        </Overlay>,
     modalRoot); 
}
}

export default Modal;