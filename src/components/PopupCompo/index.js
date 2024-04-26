import React from "react";
import "./index.css";

const Popup = (props) => {
  const { closePopup, children } = props;
  return (
    <div className="popup-overlay" onClick={() => closePopup(false)}>
      <div
        className="popup-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="close-button-popup-container">
          <button
            onClick={() => {
              closePopup(false);
            }}
            type="button"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
