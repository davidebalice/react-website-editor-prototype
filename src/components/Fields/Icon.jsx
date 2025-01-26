import React from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Icon = ({
  view,
  isEditing,
  text,
  handleMouseEnter,
  handleMouseLeave,
  content,
  field,
  style,
  itemStyle,
  isHovered,
  handleEditing,
  handleSave,
  handleKeyPress,
  handleChange,
}) => {
  return (
    <div>
      <i
        className={field.value}
        style={{ fontSize: "24px", color: "#333" }}
      ></i>
    </div>
  );
};

export default Icon;
