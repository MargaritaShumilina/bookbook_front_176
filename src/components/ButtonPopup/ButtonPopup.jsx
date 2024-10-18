function ButtonPopup(props) {
  const { textButton } = props;
  return (
    <button type="button" className="mobile-navigation__data-input_type_button">
      {textButton}
    </button>
  );
}

export default ButtonPopup;
