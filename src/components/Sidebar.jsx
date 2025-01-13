import React,{useState} from "react";
import "../styles.css";

export default function Sidebar({ id, currentStyle, setCurrentStyle }) {
  const [backgroundColor, setBackgroundColor] = useState(currentStyle?.background || "white");
  const [textColor, setTextColor] = useState(currentStyle?.color || "black");

  const changeStyle = () => {
    const newBackground = backgroundColor === "white" ? "green" : "white";
    const newColor = textColor === "black" ? "red" : "black";

    setCurrentStyle({
      ...currentStyle,
      background: newBackground,
      color: newColor,
    });
    setBackgroundColor(newBackground);  // Aggiorna il background nel selettore
    setTextColor(newColor);  // Aggiorna il colore del testo nel selettore
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








    </div>
  );
}
