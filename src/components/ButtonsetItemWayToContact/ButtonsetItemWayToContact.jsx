import React, { useEffect, useState } from "react";

function ButtonsetItemWayToContact({
  title,
  value,
  valueChange,
  changeValue,
  nextValue,
}) {
  return (
    <div className="way-to-contact-block_button-item">
      <label
        className={`way-to-contact-block_button-item-label 
                     ${value !== valueChange && valueChange !== nextValue ? "way-to-contact-block_button-item-label__border" : ""}`}
      >
        <input
          type="radio"
          className="way-to-contact-block_button-item-input"
          value={value}
          checked={value === valueChange}
          onChange={changeValue}
        />
        <span className="way-to-contact-block_label-text">{title}</span>
      </label>
    </div>
  );
}

export default ButtonsetItemWayToContact;
