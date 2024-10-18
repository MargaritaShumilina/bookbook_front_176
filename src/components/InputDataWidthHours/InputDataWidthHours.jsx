import arrowDown from '../../images/Frame_3910.svg';

function InputDataWidthHours(props) {
    const { InputDataText, InputHourText, onClick, onClickTime } = props;
    return (
        <div className="mobile-navigation__data-input-hours">
            <button 
            className="mobile-navigation__data-input-day"
            type="button"
            onClick={onClick}>
                <p className="mobile-navigation__data-input_text">{ InputDataText }</p>
                <img src={arrowDown} alt="Arrow down" className="mobile-navigation__data-input-day_icon" />
            </button>

            <button 
            className="mobile-navigation__data-input-hour"
            type="button"
            onClick={onClickTime}>
                <p className="mobile-navigation__data-input_text">{ InputHourText }</p>
                <img src={arrowDown} alt="Arrow down" className="mobile-navigation__data-input-day_icon" />
            </button>
        </div>
    );
}

export default InputDataWidthHours;
