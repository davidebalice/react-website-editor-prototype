import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";
import Image from "./Fields/Image";
import Text from "./Fields/Text";

const Field = ({
  view,
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
  const [text, setText] = useState(field?.value ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [style, setStyle] = useState(content.style || {});

  useEffect(() => {
    if (isSelected && currentStyle) {
      let updatedStyle = { ...style };

      const properties = [
        "background",
        "align",
        "position",
        "color",
        "fontFamily",
        "fontSize",
        "textAlign",
        "width",
        "border",
        "borderSelect",
        "borderSize",
        "borderType",
        "borderColor",
        "borderTop",
        "borderBottom",
        "borderLeft",
        "borderRight",
        "borderRadius",
        "radiusSelect",
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "padding",
        "paddingSelect",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "marginTop",
        "marginBottom",
      ];

      properties.forEach((prop) => {
        if (currentStyle[prop] && currentStyle[prop] !== updatedStyle[prop]) {
          updatedStyle[prop] = currentStyle[prop];
        }
      });

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
    textAlign:
      style?.textAlign === "" ? "left" : style?.textAlign + " !important",
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
          <Text
            view={view}
            isEditing={isEditing}
            text={text}
            handleEditing={handleEditing}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
            handleSave={handleSave}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
          />
        );

      case "image":
        return (
          <Image
            view={view}
            itemStyle={itemStyle}
            isEditing={isEditing}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            setFields={setFields}
            editor={editor}
            setDragMode={setDragMode}
          />
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
        return view === "mobile" ? null : <div style={itemStyle}>menu</div>;
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
