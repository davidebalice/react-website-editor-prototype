import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Field = ({
  isSelected,
  field,
  fieldId,
  editor,
  setFields,
  activeId,
  dragging,
  content,
  currentStyle,
  setCurrentStyle,
  setDragMode,
}) => {
  const fileRepositoryUrl = process.env.REACT_APP_FILE_REPOSITORY;
  const [text, setText] = useState(field?.value ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [style, setStyle] = useState(content.style || {});

  useEffect(() => {
    if (isSelected && currentStyle) {
      let updatedStyle = { ...style };

      if (
        currentStyle.background &&
        currentStyle.background !== updatedStyle.background
      ) {
        updatedStyle.background = currentStyle.background;
      }

      if (currentStyle.align && currentStyle.align !== updatedStyle.align) {
        updatedStyle.align = currentStyle.align;
      }

      if (
        currentStyle.position &&
        currentStyle.position !== updatedStyle.position
      ) {
        updatedStyle.position = currentStyle.position;
      }

      if (currentStyle.color && currentStyle.color !== updatedStyle.color) {
        updatedStyle.color = currentStyle.color;
      }

      if (
        currentStyle.fontFamily &&
        currentStyle.fontFamily !== updatedStyle.fontFamily
      ) {
        updatedStyle.fontFamily = currentStyle.fontFamily;
      }

      if (
        currentStyle.fontSize &&
        currentStyle.fontSize !== updatedStyle.fontSize
      ) {
        updatedStyle.fontSize = currentStyle.fontSize;
      }

      if (currentStyle.width && currentStyle.width !== updatedStyle.width) {
        updatedStyle.width = currentStyle.width;
      }

      setStyle(updatedStyle);
    }
  }, [isSelected, currentStyle]);

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    setDragMode("Sections");

    setFields((prevFields) => {
      return prevFields.map((f) => {
        if (field._id === f._id) {
          return {
            ...f,
            value: text,
          };
        }
        return f;
      });
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleEditing = () => {
    if (editor) {
      setIsEditing(true);
      setDragMode("none");
    } else {
      setIsEditing(false);
      setDragMode("Sections");
    }
  };

  const handleMouseDown = (e) => {
    if (isEditing && window.getSelection().toString()) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isEditing]);

  if (!field) {
    return null;
  }

  const itemStyle = {
    cursor: "pointer",
    color: style?.color ?? "#222222",
    textAlign: style?.align === "" ? "left" : style?.align,
    fontSize: style?.fontSize || "14px",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (field) {
    switch (field.type) {
      case "text":
        return (
          <div>
            {!isEditing ? (
              <div
                onClick={() => handleEditing()}
                style={itemStyle}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ) : (
              <div style={{ width: "100%" }}>
                <ReactQuill
                  value={text}
                  onChange={handleChange}
                  theme="snow"
                  placeholder=""
                  onKeyPress={handleKeyPress}
                  style={{
                    zIndex: 200,
                    position: "relative",
                    background: "white",
                    width: "100%",
                    height: "70px",
                    padding: "4px",
                    fontSize: "13px",
                  }}
                />
                <button onClick={handleSave} className="flex textSave">
                  <IoMdSave style={{fontSize:"16px"}} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        );

      case "image":
        return (
          <div
            style={itemStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <>
              <img
                src={`${fileRepositoryUrl}${field.value}`}
                alt={field.name}
                style={{
                  height: "auto",
                  opacity: isHovered ? 0.8 : 1,
                  width: "100%",
                }}
              />
            </>
          </div>
        );

      case "spacer":
        return (
          <div
            style={itemStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <>
              <div className="spacer"></div>
            </>
          </div>
        );

      case "menu":
        return <div style={itemStyle}>menu</div>;
      default:
        return (
          <div style={itemStyle}>
            <div>
              <span
                className="mx-auto"
                style={{ color: content.style.color || "#333" }}
              >
                {text}
              </span>
            </div>
          </div>
        );
    }
  }
};

export default Field;
