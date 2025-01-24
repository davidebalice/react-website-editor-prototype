import React from "react";
import { IoMdSave } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

const SaveModal = ({ modal, setModal }) => {
  return (
    <div className={`overlay ${modal ? " active" : ""}`}>
      <div className={`modal ${modal ? " active" : ""}`}>
        <div className="closeButton" onClick={() => setModal(false)}>
          <IoCloseCircle style={{ fontSize: "32px" }} />
        </div>

        <button className="flex modalSave">
          <IoMdSave style={{ fontSize: "21px" }} />
          <span>Save</span>
        </button>

        <br />
        <p style={{ color: "red", fontWeight: "bold" }}>
          Save not yet implemented
        </p>
        <p>
          Saving will be implemented later, it will allow to save the changes on
          the database.
        </p>
      </div>
    </div>
  );
};

export default SaveModal;
