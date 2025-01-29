import React from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Button = ({
  text,
  itemStyle,
  handleEditing,
}) => {
  return (
    <div>
      <div
        onClick={() => handleEditing()}
        style={itemStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default Button;
