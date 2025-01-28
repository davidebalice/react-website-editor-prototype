import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";
import Button from "./Fields/Button";
import Icon from "./Fields/Icon";
import Image from "./Fields/Image";
import Menu from "./Fields/Menu";
import Social from "./Fields/Social";
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
  setSelectedContainer,
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
    setSelectedContainer({
      id: fieldId,
      type: field?.type.charAt(0).toUpperCase() + field?.type.slice(1) || null,
    });
    setCurrentStyle(style);
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
      case "icon":
        return (
          <Icon
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

      case "button":
        return (
          <Button
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

      case "social":
        return (
          <Social
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

      case "divider":
        return (
          <div
            style={itemStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <>
              <div className="divider"></div>
            </>
          </div>
        );

      case "menu":
        return view === "mobile" ? null : (
          <Menu
            view={view}
            text={text}
            itemStyle={itemStyle}
            content={content}
            field={field}
            style={style}
          />
        );

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
