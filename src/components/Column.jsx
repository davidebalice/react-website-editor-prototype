import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaColumns, FaRegTrashAlt } from "react-icons/fa";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdAddBox } from "react-icons/md";
import { RiDragMove2Line } from "react-icons/ri";

export default function Column({
  id,
  idSection,
  items,
  i,
  view,
  children,
  contents,
  isSelected,
  currentStyle,
  setSelectedContainer,
  setCurrentStyle,
  editor,
  handleAddContent,
  handleDeleteColumn,
  setSidebar,
  setDragMode
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const column = contents?.[id] || {};
  const [style, setStyle] = useState(column.style || {});
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

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
    transform: CSS.Translate.toString(transform),
    transition,
    padding: 0,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 30,
    color: style?.color ?? "black",
    background: style?.background || "white",
    outline: hovered && editor ? "2px dashed #999" : "none",
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
        className={`column ${view === "mobile" ? "small" : ""}`}
      >
        {editor && (
          <div
            className={`flex buttonContainer   ${
              i === 0 ? "buttonColumnContainer1" : "buttonColumnContainer"
            }`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <FaColumns style={{ fontSize: "17px" }} />

            {open && (
              <>
                <div className="buttonContainerOpened">
                  <div className="textButtonContainer">Column</div>

                  <div className="buttonContainerWrapper">
                    <div
                      className="button buttonDrag"
                      data-tooltip-id="tooltip-global"
                      data-tooltip-content="Drag column"
                      onMouseEnter={()=>setDragMode("columns")}
                    >
                      <RiDragMove2Line />
                    </div>
                    <button
                      onClick={() => handleAddContent(id, 1, "")}
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
                        setSidebar(true);
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
                </div>
              </>
            )}
          </div>
        )}

        {children}
      </div>
    </SortableContext>
  );
}
