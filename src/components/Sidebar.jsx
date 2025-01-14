import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import "../styles.css";
import Content from "./Content"; // Adjust the path as necessary

export default function Sidebar({ id, currentStyle, setCurrentStyle }) {
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

  // Crea un ID univoco per il draggabile
  const draggableId = `sidebar-item-${id}`;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: draggableId, // Utilizza l'ID univoco per ogni elemento
  });

  return (
    <div className="sidebar">
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

      <p>new contents</p>

      <div ref={setNodeRef} {...attributes} {...listeners}>
        <Content
          key={draggableId} // Utilizza l'ID univoco anche qui
          id={draggableId}
          activeId={draggableId}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
          isSelected={false}
        >
          testo
        </Content>
      </div>
    </div>
  );
}
