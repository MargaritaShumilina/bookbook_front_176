import { config } from "../../utils/utils";

function ButtonPopupSubmit(props) {
    const { isLoading = false, onClick, disabledFormButton = false } = props;
    return (
        <button 
            type="button" 
            onClick={onClick} 
            className="mobile-navigation__submit-button" 
            disabled={disabledFormButton || isLoading}
        >{isLoading ? "Loading..." : config.bookNow}</button>
    );
}

export default ButtonPopupSubmit;
