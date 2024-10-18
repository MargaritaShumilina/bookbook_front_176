import React, { createContext, useContext,  useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
const modalContext = createContext();

function Modal(props) {
  const { children, isOpen, onClose } = props;
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(false);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
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
  


  return createPortal(
    <div
      className='menu-modal overlay' >
      <div className='rent-subject-modal__container' ref={modalRef}>
        <div className='rent-subject-modal__content'>
          <modalContext.Provider value={onClose}>
            {children}
          </modalContext.Provider>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Header = function ModalHeader(props) {
  const onClose = useContext(modalContext);
  return (
    <header className="rent-subject-modal__header">
      {props.children}
      <button
        className="rent-subject-modal__close_button"
        title="закрыть модальное окно"
        onClick={onClose}
      />
    </header>
  );
};

Modal.Body = function ModalBody(props) {
  return <main className="menu-modal__main">{props.children}</main>;
};

export default Modal;
