function InputPopup(props) {
    const { placeholderText, typeInput, onChange, inputText } = props;
    return (
        <input 
            type={ typeInput } 
            onChange={ onChange } 
            value={ inputText }
            placeholder={ placeholderText } 
            className="mobile-navigation__input-registration">
        </input>
    );
}

export default InputPopup;
