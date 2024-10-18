import CalendarDay from "../CalendarDay/CalendarDay";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarDate from "../CalendarDate/CalendarDate";

function CalendarRestrict(props) {
  const { isWidth } = props;
  const nameDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="calendar__restrict">
      <div className="calendar__month">
        <CalendarHeader
          month={"November"}
          year={"2023"}
          isReverse={false}
          isWidth={isWidth}
        />
        <CalendarDay nameDays={nameDays} />
        <CalendarDate dates={["", "", "", "", "", "", 1]} />
        <CalendarDate dates={[2, 3, 4, 5, 6, 7, 8]} />
        <CalendarDate dates={[9, 10, 11, 12, 13, 14, 15]} />
        <CalendarDate dates={[16, 17, 18, 19, 20, 21, 22]} />
        <CalendarDate dates={[23, 24, 25, 26, 27, 28, 29]} />
        <CalendarDate dates={[30, 31, "", "", "", "", ""]} />
      </div>
    </div>
  );
}

export default CalendarRestrict;
