import CalendarDay from '../CalendarDay/CalendarDay';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarDate from '../CalendarDate/CalendarDate';
import { nameDays, monthNamesFull } from '../../utils/utils';
import React, { useState, useEffect } from 'react';

function Calendar(props) {
    const { availableDatesCurrentMonth, availableDates, onClickCalendarPickUp, onClickCalendarDropOff, 
            fetchAllAvailableDates, getFirstAndLastDatesOfCurrentMonth, isFull, currentSubject } = props;
    const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
    const numberOfCells = 42; // 42 = 7 * 6 - это размер матрицы для календаря. 7 дней в неделе, 6 строк в сетке, итого 42 ячейки под даты на один месяц с захватом начала и конца смежных месяцев
    const currentDate = new Date();
    // Получаем текущий год, месяц и день
    //
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    //const today = currentDate.getDate();

    const [currentMonth, setCurrentMonth] = useState(month);
    const [nextMonth, setNextMonth] = useState(month+1);
    const [currentYear, setCurrentYear] = useState(year);
    const [nextYear, setNextYear] = useState(year);

    function getMonth (numberOfCells, year, month) {
        const firstDayOfMonth = new Date(year, month, 1).getDay() === 0 ? 7 : new Date(year, month, 1).getDay(); // начиная с воскресенья
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < numberOfCells; i++) {
            if(i < firstDayOfMonth - 1) {
                days.push(''); // Пустые слоты для дней предыдущего месяца
            } else if(i < firstDayOfMonth - 1 + daysInMonth) {
                days.push(i - firstDayOfMonth + 2);
            } else {
                days.push('');
            }
        }
        return days
    }

    const handleClickNextMonthButton = () => {
        if(currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }

        if(nextMonth === 11) {
            setNextYear(nextYear + 1);
            setNextMonth(0);
        } else {
            setNextMonth(nextMonth + 1)
        }
      };

      const handleClickPreviousMonthButton = () => {
        if(currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }

        if(nextMonth === 0) {
            setNextYear(nextYear - 1);
            setNextMonth(11);
        } else {
            setNextMonth(nextMonth - 1)
        }
      };

    const daysCurrentMonth = getMonth(numberOfCells, currentYear, currentMonth);
    const daysNextMonth = getMonth(numberOfCells, currentYear, nextMonth);
    const combinedDaysCurrentMonth = daysCurrentMonth.reduce((acc, day, index) => {
        if (day === "") {
          acc[index+1] = ""; // Используем индекс как ключ для пустых значений
        } else {
          acc[index+1] = availableDatesCurrentMonth[day.toString()];
        }
            return acc;
    }, {});

    const combinedDaysNextMonth = daysNextMonth.reduce((acc, day, index) => {
        if (day === "") {
            acc[index+1] = ""; // Используем индекс как ключ для пустых значений
        } else {
            acc[index+1] = availableDates[day.toString()];
        }
          return acc;
    }, {});

    useEffect(() => {
        fetchAllAvailableDates(currentSubject.id, getFirstAndLastDatesOfCurrentMonth(nextMonth).firstDate, getFirstAndLastDatesOfCurrentMonth(nextMonth).lastDate);
     }, [nextMonth])
      
    return (
    <>
        {isFull ?
            <div className="calendar">
                <div className="calendar__month">
                    <CalendarHeader
                        month={currentMonth}
                        year={currentYear}
                        isReverse={false}
                        isFullWidth={isFull}
                        onClickLeft={handleClickPreviousMonthButton}
                        onClickRight={handleClickNextMonthButton}
                        monthNamesFull={monthNamesFull}
                    />

                    <CalendarDay
                        nameDays={nameDays}
                        month={currentMonth}
                    />
                    <CalendarDate
                        dates={combinedDaysCurrentMonth}
                        onClick={onClickCalendarPickUp}
                        month={currentMonth}
                        year={currentYear}
                        nameDays={nameDays}
                        nameMonth={nameMonth}
                    />
                    
                </div>

                <div className="calendar__month">
                    <CalendarHeader
                        month={nextMonth}
                        year={nextYear}
                        isReverse={true}
                        isFullWidth={isFull}
                        onClickLeft={handleClickPreviousMonthButton}
                        onClickRight={handleClickNextMonthButton}
                        monthNamesFull={monthNamesFull}
                    />
                    <CalendarDay
                        nameDays={nameDays}
                        month={currentMonth}
                    />
                    <CalendarDate
                        dates={combinedDaysNextMonth}
                        onClick={onClickCalendarDropOff}
                        month={nextMonth}
                        year={nextYear}
                        nameDays={nameDays}
                        nameMonth={nameMonth}
                    />
                </div>
            </div>
            :
            <div className="calendar__restrict">
                <div className="calendar__month-restrict">
                    <CalendarHeader
                        month={currentMonth}
                        year={currentYear}
                        isReverse={false}
                        isFullWidth={isFull}
                        onClickLeft={handleClickPreviousMonthButton}
                        onClickRight={handleClickNextMonthButton}
                        monthNamesFull={monthNamesFull}
                    />

                    <CalendarDay
                        nameDays={nameDays}
                        month={currentMonth}
                    />
                    <CalendarDate
                        //dates={daysCurrentMonth}
                        dates={combinedDaysCurrentMonth}
                        onClick={onClickCalendarPickUp}
                        month={currentMonth}
                        year={currentYear}
                        nameDays={nameDays}
                        nameMonth={nameMonth}
                    />
                </div>
            </div>
        }

    </>
    );
}

export default Calendar;
