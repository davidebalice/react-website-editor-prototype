import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

export default function Column({
  id,
  items,
  children,
  contents,
  isSelected,
  currentStyle,
  setSelectedContainer,
  setCurrentStyle,
  editor,
  setEditor
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const column = contents?.[id] || {};

  const [style, setStyle] = useState(column.style || {});

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

  return (
    <SortableContext id={id} items={items}>
      <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
        {editor && (
          <button
            onClick={() => {
              setSelectedContainer(id);
              setCurrentStyle(style);
            }}
            className="buttonOpzColumn"
          >
            OPZ
          </button>
        )}

        {children}
      </div>
    </SortableContext>
  );
}
