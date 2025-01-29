import React from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Text = ({
  text,
  itemStyle,
  handleTextEditing,
}) => {
  return (
    <div>
      <div
        onClick={() => handleTextEditing()}
        style={itemStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default Text;
