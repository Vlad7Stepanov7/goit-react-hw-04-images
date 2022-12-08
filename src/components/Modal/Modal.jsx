import { Overlay, ModalImage } from "./Modal.styled"
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector(`#modal-root`);

const Modal = ({ onClick, children }) => {
    
    useEffect(() => {
        const handleKeyDown = e => {
        if (e.code === `Escape`) {
           onClick();
        }
    }
        window.addEventListener(`keydown`, handleKeyDown);

        return () => {
            window.removeEventListener(`keydown`, handleKeyDown);
        } 
    }, [onClick])

    const handleCloseBackdrop = e => {
        if (e.currentTarget === e.target) {
            onClick();
        }
    }

    return createPortal(
        <Overlay onClick={handleCloseBackdrop}>
            <ModalImage>
                {children}
            </ModalImage>
        </Overlay>,
     modalRoot); 
}

export default Modal;