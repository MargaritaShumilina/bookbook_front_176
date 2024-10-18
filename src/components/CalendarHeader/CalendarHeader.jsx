function CalendarHeader(props) {
    const { month, year, isReverse, isFullWidth, onClickLeft, onClickRight, monthNamesFull } = props;
    const monthName = monthNamesFull[month];

    return (
       <>
            {isFullWidth ? (
                isReverse ? ( 
                    <>
                        <div className="calendar__header calendar__header-right">
                            <div className="calendar__header-name_right">{ monthName } { year }
                            </div>
                            <span className="calendar__header-button_right" onClick={onClickRight}>
                            </span>
                        </div>   
                    </>
                    ) : ( 
                    <>
                        <div className="calendar__header calendar__header-left">
                            <span className="calendar__header-button_left" onClick={onClickLeft}>
                            </span>
                            <div className="calendar__header-name_left">{ monthName } { year }
                            </div>
                        </div>
                    </>)
                ) : (
                    <div className="calendar__header">
                        <span className="calendar__header-button_left" onClick={onClickLeft}>
                            </span>
                        <div className="calendar__header-name">{ monthName } { year }
                        </div>
                        <span className="calendar__header-button_right" onClick={onClickRight}>
                        </span>
                    </div>  
                )
            } 
        </>
    );
}

export default CalendarHeader;
