import React, { useState, useEffect } from "react";
//import debounce from 'lodash.debounce'; // применить метод отсечения вызовов (debouncing) для улучшения производительности
import { NavLink } from "react-router-dom";
import ButtonPopupSubmit from "../ButtonPopupSubmit/ButtonPopupSubmit";
import InputPopup from "../InputPopup/InputPopup";
import InputData from "../InputData/InputData";
import InputDataWidthHours from "../InputDataWidthHours/InputDataWidthHours";
import Calendar from "../Calendar/Calendar";
import InputTime from "../InputTime/InputTime";
import WayToContact from "../WayToContact/WayToContact";
import { filterAllDatesArray, isOneDaySlot, URL } from "../../utils/utils.js";

function MobileNavigation(props) {
  const {
    currentSubject,
    onClickCalendarPickUp,
    onClickCalendarDropOff,
    title,
    onClickButtonPopupSubmit,
    onClickInputDataLeft,
    onClickInputDataRight,
    placeHolderTextTel,
    placeHolderTextName,
    textButtonLeft,
    textButtonRight,
    showCalendar,
    handleInputNameChange,
    handleInputTelChange,
    inputName,
    inputTel,
    totalPrice,
    textButtonHoursStart,
    textButtonHoursEnd,
    onClickTimeStart,
    onClickTimeEnd,
    showTimeStart,
    showTimeEnd,
    onClickSelectTimeStart,
    onClickSelectTimeEnd,
    setAvailableSlots,
    availableStartHours,
    availableEndHours,
    openForBookingStartHours,
    openForBookingEndHours,
    currency = "EUR",
  } = props;

  const [availableDates, setAvailableDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const currentMonth = new Date().getUTCMonth() + 1;
  const disabledFormButton = inputName === "" || inputTel === ""; // Валидация кнопки бронирования (первый вариант)
  //
  // Функция для выполнения API запроса
  //
  const fetchAvailableDates = async (pk, start_at, end_at) => {
    const response = await fetch(
      `${URL.BASE_URL}/api/v1/slots?pk=${pk}&start_at=${start_at}&end_at=${end_at}`,
    );
    const data = await response.json();
    return data;
  };

  // Функция для выполнения нескольких запросов параллельно
  const fetchAllAvailableDates = async (subjectId, startDay, endDay) => {
    setIsLoading(true);
    try {
      const responses = fetchAvailableDates(subjectId, startDay, endDay); //, 'True', 'False');
      const allDatesArray = await responses;
      setAvailableSlots(allDatesArray);
      const datesArrayIsOpenForBooking = filterAllDatesArray(
        allDatesArray,
        true,
        true,
      );
      // Создаем объект с ключами от 1 до 31 и значениями false
      const availability = {};
      for (let day = 1; day <= 31; day++) {
        availability[day] = false;
      }

      // Проходим по массиву слотов и обновляем объект availability
      datesArrayIsOpenForBooking.forEach((slot) => {
        const date = new Date(slot.start_at);
        const day = date.getUTCDate(); // Получаем день месяца
        //console.log('day ', day);

        availability[day] = true; // Обновляем значение на true
      });
      setAvailableDates(availability);
    } catch (error) {
      console.error("Ошибка при загрузке доступных дат", error);
      setAvailableDates({});
    }
    setIsLoading(false);
  };

  // Функция для получения первой и последней даты текущего месяца. Для дебага получает даты +1 месяц (в августе на сетнябрь)
  //
  function getFirstAndLastDatesOfCurrentMonth(externalMonth) {
    const now = new Date();
    const year = now.getUTCFullYear();
    //const month = String(now.getUTCMonth() + 2).padStart(2, '0'); // Добавляем 1, так как getUTCMonth() возвращает месяцы от 0 до 11
    const month = String(externalMonth).padStart(2, "0"); // Добавляем 1, так как getUTCMonth() возвращает месяцы от 0 до 11
    const firstDate = `${year}-${month}-01T00:00:00Z`;
    const lastDay = new Date(
      Date.UTC(year, now.getUTCMonth() + 2, 0),
    ).getUTCDate();
    const lastDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}T23:59:59Z`;
    return { firstDate, lastDate };
  }
  // Вызываем fetchAllAvailableDates при загрузке компонента
  useEffect(() => {
    fetchAllAvailableDates(
      currentSubject.id,
      getFirstAndLastDatesOfCurrentMonth(currentMonth).firstDate,
      getFirstAndLastDatesOfCurrentMonth(currentMonth).lastDate,
    );
  }, []);

  return (
    <div className="mobile-navigation">
      <ul className="mobile-navigation__nav-list">
        <h2 className="mobile-navigation__title">{title}</h2>
        <figure className="mobile-navigation__figure">
          <img
            className="mobile-navigation__image"
            alt={currentSubject.title}
            src={currentSubject.main_image}
          />
          <figcaption className="mobile-navigation__subtitle">
            {currentSubject.description}
          </figcaption>
        </figure>
        <form className="mobile-navigation__form">
          {isOneDaySlot ? (
            <div className="mobile-navigation__data">
              <InputData
                InputDataText={textButtonLeft}
                onClick={onClickInputDataLeft}
              />
              <InputData
                InputDataText={textButtonRight}
                onClick={onClickInputDataRight}
              />
            </div>
          ) : (
            <div className="mobile-navigation__data-hours">
              <InputDataWidthHours
                InputDataText={textButtonLeft}
                InputHourText={textButtonHoursStart}
                onClick={onClickInputDataLeft}
                onClickTime={onClickTimeStart}
              />
              <InputDataWidthHours
                InputDataText={textButtonRight}
                InputHourText={textButtonHoursEnd}
                onClick={onClickInputDataRight}
                onClickTime={onClickTimeEnd}
              />
            </div>
          )}
          <InputPopup
            placeholderText={placeHolderTextName}
            typeInput="text"
            onChange={handleInputNameChange}
            inputText={inputName}
          />
          <WayToContact />
          <p className="mobile-navigation__input-text">
            Total:{" "}
            <label className="mobile-navigation__input-text_summary">
              {totalPrice} {currency}
            </label>
          </p>
          <p className="mobile-navigation__text-oferta">
            Нажимая кнопку "Оформить" Вы соглашаетесь с обработкой
            <NavLink
              to="https://policies.google.com/privacy?hl=ru"
              target="_blank"
              className="mobile-navigation__text-oferta_link"
            >
              персональных данных
            </NavLink>
            и 
            <NavLink
              to="https://policies.google.com/privacy?hl=ru"
              target="_blank"
              className="mobile-navigation__text-oferta_link"
            >
              договором оферты
            </NavLink>
          </p>
          <ButtonPopupSubmit
            onClick={onClickButtonPopupSubmit}
            isLoading={isLoading}
            disabledFormButton={disabledFormButton}
          />
        </form>
      </ul>
      {showCalendar ? (
        <Calendar
          onClickCalendarPickUp={onClickCalendarPickUp}
          onClickCalendarDropOff={onClickCalendarDropOff}
          availableDates={availableDates}
          availableDatesCurrentMonth={availableDates}
          fetchAllAvailableDates={fetchAllAvailableDates}
          getFirstAndLastDatesOfCurrentMonth={
            getFirstAndLastDatesOfCurrentMonth
          }
          isFull={false}
          currentSubject={currentSubject}
        />
      ) : (
        <></>
      )}
      {showTimeStart ? (
        <InputTime
          onClick={onClickSelectTimeStart}
          availableHours={availableStartHours}
          openForBookingHours={openForBookingStartHours}
        />
      ) : (
        <></>
      )}
      {showTimeEnd ? (
        <InputTime
          onClick={onClickSelectTimeEnd}
          availableHours={availableEndHours}
          openForBookingHours={openForBookingEndHours}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default MobileNavigation;
