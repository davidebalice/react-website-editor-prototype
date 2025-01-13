import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

const Content = React.memo(
  ({
    id,
    children,
    idTypes,
    isSelected,
    currentStyle,
    setSelectedContainer,
    setCurrentStyle,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const content = idTypes?.[id] || {};

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
      padding: 15,
      margin: 5,
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
      padding: "5px",
      marginRight: "10px",
      backgroundColor: "lightgray",
      borderRadius: "5px",
      userSelect: "none",
    };

    return (
      <div ref={setNodeRef} style={styles}>
        <div {...listeners} {...attributes} style={dragIconStyle}>
          <span>:::</span>
          <div
            onClick={() => {
              setSelectedContainer(id);
              setCurrentStyle(style);
            }}
            style={{ cursor: "pointer", color: "darkblue" }}
          >
            OPZ {id}
          </div>
        </div>

        <div>{children}</div>
      </div>
    );
  }
);

export default Content;
