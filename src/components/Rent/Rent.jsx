import React from "react";
import Modal from "../Modal/Modal";
import MobileNavigation from "../MobileNavigation/MobileNavigation";

function Rent(props) {
  const {
    isOpen,
    onClose,
    onClickInputDataLeft,
    onClickInputDataRight,
    title,
    handleInputNameChange,
    placeHolderTextTel,
    placeHolderTextName,
    textButtonLeft,
    textButtonRight,
    showCalendar,
    handleInputTelChange,
    onClickCalendarPickUp,
    onClickCalendarDropOff,
    currentSubject,
    onClickButtonPopupSubmit,
    inputName,
    inputTel,
    totalPrice,
    textButtonHoursStart,
    textButtonHoursEnd,
    onClickTimeStart,
    onClickTimeEnd,
    onClickSelectTimeStart,
    onClickSelectTimeEnd,
    showTimeStart,
    showTimeEnd,
    setAvailableSlots,
    availableStartHours,
    availableEndHours,
    openForBookingStartHours,
    openForBookingEndHours,
    currency,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <MobileNavigation
          handleInputNameChange={handleInputNameChange}
          title={title}
          handleInputTelChange={handleInputTelChange}
          textButtonHoursStart={textButtonHoursStart}
          textButtonHoursEnd={textButtonHoursEnd}
          onClickTimeStart={onClickTimeStart}
          onClickTimeEnd={onClickTimeEnd}
          onClickButtonPopupSubmit={onClickButtonPopupSubmit}
          onClickInputDataLeft={onClickInputDataLeft}
          onClickInputDataRight={onClickInputDataRight}
          onClickCalendarPickUp={onClickCalendarPickUp}
          onClickCalendarDropOff={onClickCalendarDropOff}
          showCalendar={showCalendar}
          showTimeStart={showTimeStart}
          showTimeEnd={showTimeEnd}
          placeHolderTextTel={placeHolderTextTel}
          placeHolderTextName={placeHolderTextName}
          currentSubject={currentSubject}
          textButtonLeft={textButtonLeft}
          textButtonRight={textButtonRight}
          inputName={inputName}
          totalPrice={totalPrice}
          onClickSelectTimeStart={onClickSelectTimeStart}
          onClickSelectTimeEnd={onClickSelectTimeEnd}
          setAvailableSlots={setAvailableSlots}
          availableStartHours={availableStartHours}
          availableEndHours={availableEndHours}
          openForBookingStartHours={openForBookingStartHours}
          openForBookingEndHours={openForBookingEndHours}
          currency={currency}
          inputTel={inputTel}/>
      </Modal.Body>
    </Modal>
  );
}

export default Rent;
