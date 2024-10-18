import './../App.css';
import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Main from './Main';
import Rent from './Rent/Rent';
import RentSubject from './RentSubject/RentSubject';
import { config, nameMonth, filterAllDatesArray, filterIsOpenForBookingArray } from '../utils/utils.js';
import { initialCards } from '../utils/cards.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js'
import PopupSuccess from './PopupSuccess/PopupSuccess.jsx';
import { DateTime } from 'luxon'; // библиотека для слежения за текущей временной зоной

function App() {

  const [cards, setCards] = React.useState(initialCards);
  const [currentUser, setCurrentUser] = React.useState({}); // default value
  const [rentIsOpen, setRentIsOpen] = React.useState(false);

  const [showTimeStart, setShowTimeStart] = React.useState(false);
  const [showTimeEnd, setShowTimeEnd] = React.useState(false);

  const [rentSubjectIsOpen, setRentSubjectIsOpen] = React.useState(false);
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectFromToDate, setSelectFromToDate] = React.useState(false);
  const [textButtonLeftInner, setTextButtonLeft] = React.useState(config.textButtonLeft);
  const [textButtonRightInner, setTextButtonRight] = React.useState(config.textButtonRight);
  const [currentSubject, setCurrentSubject] = React.useState({});
  const [inputName, setInputName] = React.useState('');
  const [inputTel, setInputTel] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState('');
  const [startRentDay, setStartRentDay] = React.useState(0);
  const [endRentDay, setEndRentDay] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [hourStart, setHourStart] = React.useState('');
  const [hourEnd, setHourEnd] = React.useState('');
  const [textButtonHoursStart, setTextButtonHoursStart] = React.useState(config.textButtonHours);
  const [textButtonHoursEnd, setTextButtonHoursEnd] = React.useState(config.textButtonHours);
  const [availableSlots, setAvailableSlots] = React.useState([]);
  const [availableStartHours, setAvailableStartHours] = React.useState({});
  const [availableEndHours, setAvailableEndHours] = React.useState({});
  const [openForBookingStartHours, setOpenForBookingStartHours] = React.useState({});
  const [openForBookingEndHours, setOpenForBookingEndHours] = React.useState({});
  
  const setPopupOpen = () =>{
    setError(false);
    setPopupIsOpen(true);
  } 

  const setPopupOpenWithError = () => {
    setError(true);
    setPopupIsOpen(true);
  };

  const toggleCalendar = () => {
    setShowTimeStart(false);
    setShowTimeEnd(false);
    setShowCalendar(!showCalendar);
  };

  const toggleTimeStart = () => {
    setShowCalendar(false);
    setShowTimeEnd(false);
    setShowTimeStart(!showTimeStart);
  };

  const toggleTimeEnd = () => {
    setShowCalendar(false);
    setShowTimeStart(false);
    setShowTimeEnd(!showTimeEnd);
  };

  const setOpenRent = () => {
    setRentIsOpen(true);
  };

  const setOpenSubject = () => {
    setRentSubjectIsOpen(true);
  };

  const setCloseSubjectRent = () => {
    setRentSubjectIsOpen(false);
  };

  const setCloseRent = () => {
    setRentIsOpen(false);
    setTextButtonLeft(config.textButtonLeft);
    setTextButtonRight(config.textButtonRight);
    setTextButtonHoursStart(config.textButtonHours);
    setTextButtonHoursEnd(config.textButtonHours);
    setShowCalendar(false);
    setShowTimeEnd(false);
    setShowCalendar(false);
    setShowTimeStart(false);
  };

  const handleClickPickUp = () => {
    toggleCalendar();
    setSelectFromToDate(false);
  };

  const handleClickDropOff = () => {
    toggleCalendar();
    setSelectFromToDate(true);
  };

  const handleInputNameChange = (evt) => {
    const newValue = evt.target.value;
    setInputName(newValue);
  };

  const handleInputTelChange = (evt) => {
    const newValue = evt.target.value;
    setInputTel(newValue);
  };

  function formatToISO(dateStr, timeStr) {
    const currentYear = new Date().getFullYear();
    const dateTimeStr = `${currentYear} ${dateStr} ${timeStr}`; // Формируем строку в формате 'YYYY MMM DD HH:mm'
    const dateTime = DateTime.fromFormat(dateTimeStr, 'yyyy d MMM HH:mm', { zone: 'Europe/Moscow' });
    const isoString = dateTime.toISO().split('.')[0] + 'Z'; // Преобразуем в строку формата ISO 8601
      return isoString;
  }

  function filterIdsByStartAt(array, startRange, endRange) {
    return array
        .filter(item => {
            const itemStartAt = new Date(item.start_at).getTime();
            const startTime = new Date(startRange).getTime();
            const endTime = new Date(endRange).getTime();
            return itemStartAt >= startTime && itemStartAt <= endTime;
        })
        .map(item => item.id);
}

  const handleCreateOrder = () => {

    // 2024-08-01T07:00:00Z
    const isoDateStart = formatToISO(textButtonLeftInner, hourStart);
    const isoDateEnd = formatToISO(textButtonRightInner, hourEnd);
    const filteredIds = filterIdsByStartAt(availableSlots, isoDateStart, isoDateEnd);
    //const slots = [3043, 3044];

    //
    // По готовности новых компонентов заглушку уберем
    const dataOrder = {
      "first_name": inputName,
      "last_name": "ridges",
      "whatsapp": "+111222333",
      "telegram_id": "@qqw",
      "phone_number": inputTel,
      "email": "bookbookmr@gmail.com",
      "status": "booked",
      "slots": filteredIds,
      "total_price": filteredIds.length * currentSubject.booking_price,
      "comment": "qwert123",
      "merchant": data[0].merchant
  };

    api.createOrder(dataOrder)
      .then((data) => {
          console.log(data);
          setPopupIsOpen(true);
      })
      .catch((error) => {
        setPopupOpenWithError();
        console.error(error);
    });

    setCloseRent();
    setInputName('');
    setInputTel('');
  }

function getAvailableSlotsByDate(slots, targetDate) {
  return slots.filter(slot => {
      // Преобразуем дату начала в объект Date
      const slotDate = new Date(slot.start_at);

      // Преобразуем целевую дату в объект Date
      const target = new Date(targetDate);

      // Сравниваем год, месяц и день
      return slotDate.getFullYear() === target.getFullYear() &&
             slotDate.getMonth() === target.getMonth() &&
             slotDate.getDate() === target.getDate();
  });
}

  const handleClicSelectDate = (day) => {

    const ariaLabelValue = day.target.closest('.calendar__month-date_number').getAttribute('aria-label').split(' ');
    //
    // Получаем выбранную дату
    //
    const currentMonth = nameMonth[ariaLabelValue[2]] + 1;
    const currentDay = [ariaLabelValue[3], String(currentMonth).padStart(2, '0'), ariaLabelValue[1]].join('-');
    const datesArrayAllDates = filterAllDatesArray(availableSlots, true, true);
    const datesArrayIsOpenForBooking = filterIsOpenForBookingArray(availableSlots, true);
  
    const availableHourSlots = getAvailableSlotsByDate(datesArrayAllDates, currentDay);
    const openForBookingHourSlots = getAvailableSlotsByDate(datesArrayIsOpenForBooking, currentDay);
    
    if(selectFromToDate) {
      const isCurrentMonth = nameMonth[textButtonLeftInner.split(' ')[1]] <= nameMonth[ariaLabelValue[2]];
      // Изменять это поле можно, только когда выбрана дата начала аренды и число справа этого же месяца или позднее. Выбрать справа дату ранее, чем слева нельзя
      //
      if(((textButtonRightInner !== ariaLabelValue) && (isCurrentMonth) && (parseInt(textButtonLeftInner.split(' ')[0]) <= parseInt(ariaLabelValue[1])))
        | ((parseInt(textButtonLeftInner.split(' ')[0]) > parseInt(ariaLabelValue[1])) && (parseInt(nameMonth[ariaLabelValue[2]]) > parseInt(nameMonth[textButtonLeftInner.split(' ')[1]])))
      ) {
        setTextButtonRight(ariaLabelValue[1] + ' ' + ariaLabelValue[2]);
        setEndRentDay(parseInt(ariaLabelValue[1]));
        setTotalPrice((parseInt(ariaLabelValue[1]) - startRentDay) === 0 ? currentSubject.booking_price : (parseInt(ariaLabelValue[1]) - startRentDay) * currentSubject.booking_price);
      }
      setSelectFromToDate(false);
      setAvailableEndHours(availableHourSlots);
      setOpenForBookingEndHours(openForBookingHourSlots);
    } else {
      if((textButtonLeftInner !== ariaLabelValue) && (ariaLabelValue[1] !== '')) {
        setTextButtonLeft(ariaLabelValue[1] + ' ' + ariaLabelValue[2]);
        setStartRentDay(parseInt(ariaLabelValue[1]));
        if((endRentDay - parseInt(ariaLabelValue[1])) >= 0) {
          setTotalPrice((endRentDay - parseInt(ariaLabelValue[1])) === 0 ? currentSubject.booking_price : (endRentDay - parseInt(ariaLabelValue[1])) * currentSubject.booking_price);
        }
        //
        // Сбрасываем число справа, если новое число слева больше
        //
        if((parseInt(ariaLabelValue[1]) > parseInt(textButtonRightInner.split(' ')[0])) && (parseInt(nameMonth[ariaLabelValue[2]]) >= parseInt(nameMonth[textButtonRightInner.split(' ')[1]]))) {
          setTextButtonRight(config.textButtonRight);
          setTotalPrice(currentSubject.booking_price);
        }
      }
      setSelectFromToDate(true);
      setAvailableStartHours(availableHourSlots);
      setOpenForBookingStartHours(openForBookingHourSlots);
    }
    toggleCalendar();
  };

  const handleClicSelectStartHour = (hour) => {
    setHourStart(hour);
    toggleTimeStart();
    if(textButtonLeftInner !== config.textButtonLeft) {
      setTextButtonHoursStart(hour);
    }
  };

  const handleClicSelectEndHour = (hour) => {
    setHourEnd(hour);
    toggleTimeEnd();
    if(textButtonRightInner !== config.textButtonRight) {
      setTextButtonHoursEnd(hour);
    }
  };

  const data = Array.from( cards.subjectsData.data === undefined ? {}: cards.subjectsData.data);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Routes>
      <Route
        exact
        path='/'
        element={
          <Main
            setOpenSubject={setOpenSubject}
            setOpenSuccess={setPopupOpen}
            setOpenSuccessWithError={setPopupOpenWithError}
            setCards={setCards}
          />
        }
      />
    <Route
        exact
        path='/:id'
        element={
          <Main
            setOpenSubject={setOpenSubject}
            setOpenSuccess={setPopupOpen}
            setOpenSuccessWithError={setPopupOpenWithError}
            setCards={setCards}
          />
        }
      />
    </Routes>
    {rentIsOpen && (
      <Rent
        isOpen={rentIsOpen}
        onClose={setCloseRent}
        onClickInputDataLeft={handleClickPickUp}
        onClickInputDataRight={handleClickDropOff}
        onClickCalendarPickUp={handleClicSelectDate}
        onClickCalendarDropOff={handleClicSelectDate}
        showCalendar={showCalendar}
        showTimeStart={showTimeStart}
        showTimeEnd={showTimeEnd}
        title={config.title}
        cards={data}
        handleInputNameChange={handleInputNameChange}
        handleInputTelChange={handleInputTelChange}
        placeHolderTextTel={config.placeHolderTextTel}
        placeHolderTextName={config.placeHolderTextName}
        textButtonHoursStart={textButtonHoursStart}
        textButtonHoursEnd={textButtonHoursEnd}
        textButtonLeft={textButtonLeftInner}
        textButtonRight={textButtonRightInner}
        currentSubject={currentSubject}
        onClickButtonPopupSubmit={handleCreateOrder}
        inputName={inputName}
        inputTel={inputTel}
        totalPrice={totalPrice}
        onClickTimeStart={toggleTimeStart}
        onClickTimeEnd={toggleTimeEnd}
        onClickSelectTimeStart={handleClicSelectStartHour}
        onClickSelectTimeEnd={handleClicSelectEndHour}
        setAvailableSlots={setAvailableSlots}
        availableStartHours={availableStartHours}
        availableEndHours={availableEndHours}
        openForBookingStartHours={openForBookingStartHours}
        openForBookingEndHours={openForBookingEndHours}
        currency={cards.currency}
      />
    )}
    {rentSubjectIsOpen && (
      <RentSubject
        isOpen={rentSubjectIsOpen}
        onClose={setCloseSubjectRent}
        cards={data}
        setCloseSubjectRent={setCloseSubjectRent}
        setOpenRent={setOpenRent}
        setCurrentSubject={setCurrentSubject}
        setTotalPrice={setTotalPrice}
        currency={cards.currency}
      />
    )}
    
    {popupIsOpen && (
      <PopupSuccess isOpen={popupIsOpen} isError={error} setIsOpen ={setPopupIsOpen}
      />
    )}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
