function InputTime(props) {
    const { onClick, availableHours, openForBookingHours } = props;
    const nameHours = ['01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00',
    '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00',
    '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', 
    '23:00:00', '00:00:00'];

    // Занятые слоты
      function updateAvailability(schedule) {
        const availability = {"01:00:00": false, "02:00:00": false, "03:00:00": false, "04:00:00": false, "05:00:00": false,
          "06:00:00": false, "07:00:00": false, "08:00:00": false, "09:00:00": false, "10:00:00": false, "11:00:00": false,
          "12:00:00": false, "13:00:00": false, "14:00:00": false, "15:00:00": false, "16:00:00": false, "17:00:00": false, 
          "18:00:00": false, "19:00:00": false, "20:00:00": false, "21:00:00": false, "22:00:00": false, "23:00:00": false,
          "00:00:00": false};
          if (Object.entries(schedule).length !== 0) { // проверяем, не пуст ли обьект
            schedule.forEach(item => {
              // Извлекаем часы из поля start_at
              const startTime = item.start_at.split('T')[1]; // Получаем строку вида "19:00:00Z"
              const hour = startTime.split(':')[0] + ":00:00"; // Получаем строку вида "19:00:00"
              // Проверяем наличие часа в объекте availability и меняем значение на true
              if (availability.hasOwnProperty(hour)) {
                  availability[hour] = true;
              }
            });
            return availability
          } else {
            return availability
          }
        };

    const availability = updateAvailability(availableHours);
    const openForBooking = updateAvailability(openForBookingHours);
    const combinedArray = nameHours.map((hour, index) => {

      return [hour.slice(0, -3), openForBooking[hour], availability[hour]];
    });

    const hourToRender = combinedArray ? combinedArray.map((item, index) => (
        <button 
            className="timeSet__button" 
            type="button"
            key={index}
            disabled={!item[1] || !item[2]} 
            onClick={() => onClick(item[0])}>{item[0]}
            {item[1] && !item[2] ?
              <span className="timeSet__button_busy" > </span> :
              <></>
            }
        </button>
      )) : [];

    return (
      <div className="timeSet">
        { hourToRender }
      </div>
    );
  }

export default InputTime;
