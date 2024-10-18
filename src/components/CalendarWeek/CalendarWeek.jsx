import React, { useRef } from 'react';

function CalendarWeek(props) {
    const { onClick, dates, month, year, nameMonth, nameDays } = props;
    const divRef = useRef(null);

    const monthDateToRender = dates ? dates.map((item, index) => {
        const ariaLabelMonthText = nameDays[index] + ' ' + item[0] + ' ' + nameMonth[month] + ' ' + year;

        return (
            <div className={item[1] ? "calendar__month-date_number" : "calendar__month-date_number calendar__month-date_number-disabled"} 
                ref={divRef}
                aria-label={ariaLabelMonthText} 
                id={item[0]} 
                key={ariaLabelMonthText}
                onClick={onClick}
                style={{ pointerEvents: !item[1] ? 'none' : 'auto' }}
                >
                <span>{item[0]}</span>
            </div>
            )}
      ) : [];
      
    return (
        <div className="calendar__month-date">
            {monthDateToRender}
        </div>
    );
}

export default CalendarWeek;
