import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { RxDividerVertical } from "react-icons/rx";

export default function Container({
  id,
  items,
  children,
  type,
  pageStyle,
  currentStyle,
  setCurrentStyle,
  setSelectedContainer,
  isSelected,
  editor
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [style, setStyle] = useState(pageStyle);

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
    border: type === "section" ? "1px solid green" : "1px solid blue",
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
          <div className="flex buttonContainer buttonPageContainer">
            <div className="textButtonContainer" style={{background:"none"}}>Page</div>

            <button
              onClick={() => {
                setSelectedContainer(id);
                setCurrentStyle(style);
              }}
              className="button buttonOpzContent"
              data-tooltip-id="tooltip-global"
              data-tooltip-content="Options"
            >
              <HiMiniCog6Tooth />
            </button>
          </div>
        )}

        {children}
      </div>
    </SortableContext>
  );
}
