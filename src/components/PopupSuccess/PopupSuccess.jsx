import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import success from '../../images/success.svg';
import error   from '../../images/error.svg';

function PopupSuccess(props) {
  const { isOpen, isError, setIsOpen } = props;
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return isOpen && createPortal(
    <div
      className='popup-success-modal'

      >
      <div className='popup-success-modal__container'   ref={modalRef}>
        <div className='popup-success-modal__content'>
          <header className='popup__header'>
            <button
            className='popup__close_button'
            aria-label="close modal window"
            onClick={closeModal}
          />
          </header>
          <main className="popup-success__info">
            <div className="popup-success__infocontainer">
              <img
                className="popup-success__status"
                src={isError ? error : success}
                alt={isError ? "Error" : "Success"}
              />
              <h1 className="popup-success__successinfo">
                {isError ? "ERROR" : "SUCCESS"}
              </h1>
              <p className="popup-success__successtext">
                We believe our energy should be always green
              </p>
            </div>
            <button className="popup-enter__button">
              {" "}
              <span>Button</span>{" "}
            </button>
          </main>
        </div>
      </div>
    </div>,
    document.body
  ) 
}

export default PopupSuccess;
