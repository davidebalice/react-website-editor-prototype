import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdAddBox } from "react-icons/md";
import { PiRectangleDashedBold } from "react-icons/pi";

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
  pageId,
  setSidebar,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const section = contents[id] || {};
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
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
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 100,
    color: style?.color ?? "black",
    background: style?.background || "white",
    outline: hovered && editor ? "2px dashed #999" : "none",
  };

  return (
    <SortableContext id={id} items={Array.isArray(items) ? items : []}>
      <div
        ref={setNodeRef}
        style={styles}
        {...attributes}
        {...listeners}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {editor && (
          <>
            <div
              className="flex buttonContainer buttonSectionContainer"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <PiRectangleDashedBold style={{ fontSize: "20px" }} />

              {open && (
                <>
                  <div className="buttonContainerOpened">
                    <div className="textButtonContainer">Section</div>

                    <div className="buttonContainerWrapper">
                      <button
                        onClick={() => handleAddSection(id)}
                        className="button buttonAddContent"
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Add section"
                      >
                        <MdAddBox />
                      </button>

                      <button
                        onClick={() => handleAddColumn(id)}
                        className="button buttonAddContent"
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Add column"
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
                        onClick={() => handleDeleteSection(id, pageId)}
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
          </>
        )}
        {children}
      </div>
    </SortableContext>
  );
}
