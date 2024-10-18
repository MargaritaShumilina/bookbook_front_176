import CalendarWeek from '../CalendarWeek/CalendarWeek';

function CalendarDate(props) {
    const { onClick, dates, month, year, nameMonth, nameDays } = props;
    const weeks = 6;//(dates.length)/7;
    const weeksArray = [];

    //const datesArray = Object.values(dates2);
    //console.log('datesArray ', datesArray);
    //const chunkSize = 7;
    
    const result = [];
    
    // Преобразуем объект в массив пар [ключ, значение]
    const entries = Object.entries(dates);
    let currentDay = 0;
    for (let i = 0; i < entries.length; i++) {
        if(entries[i][1] === '') {
            result.push(['', '']);
        } else {
            currentDay++;
            result.push([currentDay, entries[i][1]]);
        }
    }

    // Разбивка массива с числами месяца на недели (6 недель - 6 массивов)
    //
    for(let i = 0; i < weeks; i++) {
        let targerArray = [];
        targerArray.push(result.slice(i*6+i, i*6+6+i+1));
        weeksArray.push(targerArray);
    }

    const weeksToRender = weeksArray ? weeksArray.map((week, index) => {
        const monthDateToRender = week ? week.map((item) => {
            return (
                <CalendarWeek
                    dates={item}
                    onClick={onClick}
                    month={month}
                    year={year}
                    nameDays={nameDays}
                    nameMonth={nameMonth}
                    key={`${index}-${month}-${year}`}
                />
            );
        }) : [];
        return (
            <>
                {monthDateToRender}
            </>
        );
    }) : [];

    return (
        <>
            {weeksToRender}
        </>
    );
}

export default CalendarDate;
