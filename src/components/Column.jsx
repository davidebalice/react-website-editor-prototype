import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

export default function Column({
  id,
  items,
  children,
  idTypes,
  isSelected,
  currentStyle,
  setSelectedContainer,
  setCurrentStyle,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const column = idTypes?.[id] || {};

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
      <button
        onClick={() => {
          setSelectedContainer(id);
          setCurrentStyle(style);
        }}
      >
        OPZ
      </button>

      <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
        {children}
      </div>
    </SortableContext>
  );
}
