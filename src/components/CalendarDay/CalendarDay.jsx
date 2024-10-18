function CalendarDay(props) {
    const { month, nameDays } = props;
    const nameDaysToRender = nameDays ? nameDays.map((item) => (
        <div className="calendar__month-name_day" key={`${item}-${month}`}>{item}</div>
      )) : [];
      
  return <div className="calendar__month-name">{nameDaysToRender}</div>;
}

export default CalendarDay;
