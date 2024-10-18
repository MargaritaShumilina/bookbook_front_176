import React from 'react';
import ModalSubject from '../ModalSubject/ModalSubject';
import SubjectNav from '../SubjectNav/SubjectNav';

function RentSubject(props) {
  const { isOpen, onClose, cards, setCloseSubjectRent, 
          setOpenRent, setCurrentSubject, setTotalPrice, currency } = props;
  return (
    <ModalSubject isOpen={isOpen} onClose={onClose}>
      <ModalSubject.Header />
      <ModalSubject.Body>
      <SubjectNav
      cards={cards}
      setCloseSubjectRent={setCloseSubjectRent}
      setOpenRent={setOpenRent}
      setCurrentSubject={setCurrentSubject}
      setTotalPrice={setTotalPrice}
      currency={currency}
        />
      </ModalSubject.Body>
    </ModalSubject>
  );
}

export default RentSubject;
