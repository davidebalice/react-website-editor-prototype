import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { GrInfo } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";

import tutorial1 from "../assets/img/tutorial1.jpg";
import tutorial2 from "../assets/img/tutorial2.jpg";
import tutorial3 from "../assets/img/tutorial3.jpg";
import tutorial4 from "../assets/img/tutorial4.jpg";
import tutorial5 from "../assets/img/tutorial5.jpg";
import tutorial6 from "../assets/img/tutorial6.jpg";

const Info = ({ setInfo }) => {
  const [tab, setTab] = useState(1);

  return (
    <div className="infoContainer">
      <b onClick={() => setInfo(false)}>
        <IoMdCloseCircle
          style={{ float: "right", fontSize: "32px", cursor: "pointer" }}
        />
      </b>
      <br />

      <div style={{ display: "flex" }}>
        <button
          onClick={() => setTab(1)}
          className="flex topButton"
          style={{ marginLeft: "0" }}
        >
          <FaInfoCircle style={{ fontSize: "16px" }} />
          <span>Info</span>
        </button>
        <button
          onClick={() => setTab(2)}
          className="flex topButton"
          style={{ marginLeft: "6px" }}
        >
          <GrInfo style={{ fontSize: "16px" }} />
          <span>Tutorial</span>
        </button>
      </div>

      <br />

      {tab === 1 && (
        <>
          <b style={{ fontSize: "24px" }}>Website Editor</b>
          <p>
            This app is a prototype of a website editor, starting point of a
            more complex project.
            <br />
            <br />
            A powerful and intuitive tool for managing the layout of fully
            responsive websites. This editor allows you to easily design and
            customize your site through drag-and-drop functionality and
            user-friendly buttons, simplifying the entire process. Everything is
            draggable: you can move columns between different sections, shift
            content between columns, and rearrange sections, columns, and
            individual content effortlessly. In addition to managing layouts,
            you can add or delete elements and customize various options, such
            as backgrounds, borders, fonts, font sizes, and more. Whether you're
            building from scratch or refining an existing design, the editor
            provides complete control for creating a visually appealing and
            functional website.
            <br />
            <br />
            This app is just a prototype, at the moment there is no connection
            with a database, data saving is not supported.
            <br />
            <br />
            <b>Some possible future updates</b>:
            <br />
            <br />
            - connection of the app with a database
            <br />
            - login to access the editor
            <br />
            - management of more contents
            <br />
            - more options for each content
            <br />
            - content product management
            <br />
            - page management
            <br />
            - and more
            <br />
            <br />
            This app uses <b>dnd-kit</b> for drag and drop operations and{" "}
            <b>quill</b> for text editor.
          </p>
        </>
      )}

      {tab === 2 && (
        <>
          <b style={{ fontSize: "24px" }}>Tutorial</b>
          <p>
            <br />
            <b>Drag sections, columns and contents</b>
            <br />
            Hover over the section, column or content, drag the content using
            the drag icon, release the mouse at the position where you want to
            insert the content
            <br /> <br />
            <img src={tutorial1} style={{ border: "1px solid #ccc" }} alt="tutorial img 1"/>
            <br />
            <br />
            <hr />
            <br />
            <b>Add contents</b>
            <br />
            Hover over the column icon, click the + button
            <br />
            Select the content to add from the sidebar
            <br /> <br />
            <div style={{ display: "flex", gap: "40px" }}>
              <img src={tutorial2} style={{ border: "1px solid #ccc" }} alt="tutorial img 2" />
              <img src={tutorial3} style={{ border: "1px solid #ccc" }} alt="tutorial img 3" />
            </div>
            <br />
            <br />
            <hr />
            <br />
            <b>Options</b>
            <br />
            Click on the gear button, access the options on the sidebar, you can
            adjust the background, border, font etc.
            <br />
            <br />
            <div style={{ display: "flex", gap: "40px" }}>
              <img src={tutorial5} style={{ border: "1px solid #ccc" }} alt="tutorial img 5" />
              <img src={tutorial6} style={{ border: "1px solid #ccc" }} alt="tutorial img 6"/>
            </div>
            <br />
            <br />
            <hr />
            <br />
            <b>Text modify</b>
            <br />
            Click on the text to access the editor
            <br />
            <br />
            <img src={tutorial4} style={{ border: "1px solid #ccc" }} alt="tutorial img 4"/>
            <br />
            <br />
          </p>
        </>
      )}
    </div>
  );
};

export default Info;
