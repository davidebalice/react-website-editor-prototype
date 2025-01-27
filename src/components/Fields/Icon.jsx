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
  const styles = {
    width: "80px",
    height: "80px",
    background: style?.background || "blue",
    borderRadius: "50%",
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignIterms: "center",
    boxShadow: style?.boxShadow || "",
  };

  return (
    <div style={styles}>
      <i
        className={field.value}
        style={{ fontSize: "26px", color: "#fff" }}
      ></i>
    </div>
  );
};

export default Icon;
