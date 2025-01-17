import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdAddBox } from "react-icons/md";
import { RiDragMove2Line } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";

export default function Column({
  id,
  idSection,
  items,
  children,
  contents,
  isSelected,
  currentStyle,
  setSelectedContainer,
  setCurrentStyle,
  editor,
  setEditor,
  handleAddContent,
  handleDeleteColumn,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const column = contents?.[id] || {};
  const [hovered, setHovered] = useState(false);
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
    background: hovered && editor ? "#f0f5fa" : style?.background ?? "white",
  };

  return (
    <SortableContext id={id} items={items}>
      <div
        ref={setNodeRef}
        style={styles}
        {...attributes}
        {...listeners}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {editor && hovered && (
          <div className="flex buttonContainer buttonColumnContainer">
            <div className="textButtonContainer">Column</div>
            <div className="spacerButtonContainer">
              <div>
                <RxDividerVertical />
              </div>
            </div>
            <div
              className="button buttonDrag"
              data-tooltip-id="tooltip-global"
              data-tooltip-content="Drag column"
            >
              <RiDragMove2Line />
            </div>
            <button
              onClick={() => handleAddContent(id)}
              className="button buttonAddContent"
              data-tooltip-id="tooltip-global"
              data-tooltip-content="Add content"
            >
              <MdAddBox />
            </button>

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
            <button
              onClick={() => {
                handleDeleteColumn(id, idSection);
              }}
              className="button buttonOpzColumn"
              data-tooltip-id="tooltip-global"
              data-tooltip-content="Delete"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        )}

        {children}
      </div>
    </SortableContext>
  );
}
