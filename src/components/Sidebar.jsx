import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack} from "react-icons/io";
import "../styles.css";

export default function Sidebar({
  id,
  currentStyle,
  setCurrentStyle,
  setEditor,
  editor,
  sidebar,
  setSidebar,
}) {
  const [backgroundColor, setBackgroundColor] = useState(
    currentStyle?.background || "white"
  );
  const [textColor, setTextColor] = useState(currentStyle?.color || "black");

  const changeStyle = () => {
    const newBackground = backgroundColor === "white" ? "green" : "white";
    const newColor = textColor === "black" ? "red" : "black";

    setCurrentStyle({
      ...currentStyle,
      background: newBackground,
      color: newColor,
    });
    setBackgroundColor(newBackground);
    setTextColor(newColor);
  };

  const handleBackgroundChange = (e) => {
    const newBackground = e.target.value;
    setBackgroundColor(newBackground);
    setCurrentStyle({
      ...currentStyle,
      background: newBackground,
    });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    setCurrentStyle({
      ...currentStyle,
      color: newColor,
    });
  };

  const draggableId = `sidebar-item-${id}`;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: draggableId,
  });

  return (
    <div className={`sidebar ${sidebar ? "" : "close"}`}>


      <div className="flexCenter sidebarClose" onClick={() => setSidebar(!sidebar)}>
       {sidebar ? (<><IoIosArrowBack/></>) : (<> <IoIosArrowForward /></>)}
      </div>




      
      Editor:
      <div onClick={() => setEditor(!editor)}>attiva / disattiva editor</div>
      <div onClick={changeStyle}>
        Cambia {currentStyle?.background ?? null} {id}
      </div>
      <div>
        <label htmlFor="backgroundColor">Scegli colore di sfondo:</label>
        <input
          type="color"
          id="backgroundColor"
          value={backgroundColor}
          onChange={handleBackgroundChange}
        />
      </div>
      <div>
        <label htmlFor="textColor">Scegli colore del testo:</label>
        <input
          type="color"
          id="textColor"
          value={textColor}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
