import React from "react";
import { IoCloseCircle } from "react-icons/io5";

const PageModal = ({ modal, setModal }) => {
  return (
    <div className={`overlay ${modal ? " active" : ""}`}>
      <div className={`modal ${modal ? " active" : ""}`}>
        <div className="closeButton" onClick={() => setModal(false)}>
          <IoCloseCircle style={{ fontSize: "32px", color: "#333" }} />
        </div>

        <button className="flex modalSave">
          <span>Pages</span>
        </button>

        <br />
        <p style={{ color: "red", fontWeight: "bold" }}>
          Pages not yet implemented
        </p>
        <p style={{ color: "#111" }}>
        Change page and routing will be implemented later</p>
      </div>
    </div>
  );
};

export default PageModal;
