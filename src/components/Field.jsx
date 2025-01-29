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
  isTextEditing,
  setIsTextEditing,
  editor,
  setFields,
  activeId,
  setActiveId,
  content,
  currentStyle,
  setCurrentStyle,
  setSelectedContainer,
  selectedText,
  setSelectedText,
  setDragMode,
  updateText,
  setUpdateText,
}) => {
  const [text, setText] = useState(() => {
    if (field?.type === "image") {
      if (field?.type === "image" && content?.text) {
        return content?.text?.value ?? "";
      } else {
        return null;
      }
    } else {
      return field?.value ?? "";
    }
  });

  useEffect(() => {
    if (fieldId === activeId && updateText) {
      setText(selectedText);
    }
  }, [selectedText]);

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

  const handleTextEditing = () => {
    setUpdateText(true);
    setActiveId(fieldId);
    setSelectedContainer({
      id: fieldId,
      type: field?.type.charAt(0).toUpperCase() + field?.type.slice(1) || null,
    });
    if (field?.type === "image") {
      setSelectedText(text);
    } else {
      setSelectedText(text);
    }
    setCurrentStyle(style);
    if (editor) {
      setIsTextEditing(true);
      setDragMode("none");
    } else {
      setIsTextEditing(false);
      setDragMode("Sections");
    }
  };

  const handleMouseDown = (e) => {
    if (isTextEditing && window.getSelection().toString()) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isTextEditing) {
      document.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isTextEditing]);

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
            isTextEditing={isTextEditing}
            handleTextEditing={handleTextEditing}
            setSelectedText={setSelectedText}
            text={text}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
          />
        );
      case "icon":
        return (
          <Icon
            view={view}
            text={text}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
          />
        );

      case "image":
        return (
          <Image
            isTextEditing={isTextEditing}
            handleTextEditing={handleTextEditing}
            view={view}
            text={text ?? ""}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
            setFields={setFields}
            editor={editor}
            setDragMode={setDragMode}
          />
        );

      case "button":
        return (
          <Button
            view={view}
            text={text}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
          />
        );

      case "social":
        return (
          <Social
            view={view}
            text={text}
            itemStyle={itemStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            content={content}
            field={field}
            style={style}
            isHovered={isHovered}
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
