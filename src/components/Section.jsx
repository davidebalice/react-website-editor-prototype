import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

export default function Section({
  id,
  items,
  children,
  currentStyle,
  setCurrentStyle,
  setSelectedContainer,
  isSelected,
  contents,
  editor,
  handleAddSection,
  handleAddColumn,
  handleDeleteSection,
  pageId
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const section = contents[id] || {};

  const [style, setStyle] = useState(
    section.style || { background: "white", color: "black" }
  );

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
    <SortableContext id={id} items={Array.isArray(items) ? items : []}>
      <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
        {editor && (
          <>
            <div className="buttonContainer buttonSectionContainer">
              <button onClick={() => handleAddSection(id)}>
                Aggiungi sezione
              </button>

              <button
                onClick={() => handleAddColumn(id)}
                className="buttonAddColumn"
              >
                Aggiungi colonna
              </button>

              <button
                onClick={() => handleDeleteSection(id,pageId)}
                className="buttonAddColumn"
              >
                delete
              </button>

              <button
                onClick={() => {
                  setSelectedContainer(id);
                  setCurrentStyle(style);
                }}
              >
                OPZ
              </button>
            </div>
          </>
        )}
        {children}
      </div>
    </SortableContext>
  );
}
