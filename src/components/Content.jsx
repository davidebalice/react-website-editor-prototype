import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

const Content = React.memo(
  ({
    id,
    children,
    contents,
    isSelected,
    currentStyle,
    setSelectedContainer,
    setCurrentStyle,
    editor,
    handleDeleteContent
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const content = contents?.[id] || {};

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

        if (
          currentStyle.fontSize &&
          currentStyle.fontSize !== updatedStyle.fontSize
        ) {
          updatedStyle.fontSize = currentStyle.fontSize;
        }

        if (currentStyle.color && currentStyle.color !== updatedStyle.color) {
          updatedStyle.color = currentStyle.color;
        }

        setStyle(updatedStyle);
      }
    }, [isSelected, currentStyle]);

    console.log(content.style);

    const styles = {
      transform: CSS.Transform.toString(transform),
      transition,
      flex: 1,
      flexWrap: "wrap",
      alignItems: "center",
      borderRadius: 5,
      userSelect: "none",
      cursor: "grab",
      boxSizing: "border-box",
      minHeight: 100,
      color: style?.color ?? "black",
      background: style?.background ?? "white",
    };

    const dragIconStyle = {
      cursor: "grab",
      userSelect: "none",
      position:"relative"
    };

    return (
      <div ref={setNodeRef} style={styles}>
        <div {...listeners} {...attributes} style={dragIconStyle}>
          {editor && (
            <div className="buttonContainer buttonContentContainer">
              <div className="dragButton">:::</div>

              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  setSelectedContainer(id);
                  setCurrentStyle(style);
                }}
                className="buttonOpzContent"
              >
                OPZ
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  handleDeleteContent(id);
                }}
                className="buttonOpzContent"
              >
                delete
              </button>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    );
  }
);

export default Content;
