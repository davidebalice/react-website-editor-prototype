import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdAddBox } from "react-icons/md";
import { PiRectangleDashedBold } from "react-icons/pi";
import { RiDragMove2Line } from "react-icons/ri";

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
  dragMode,
  setDragMode,
  dragging,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled: dragMode === "none" || dragMode !== "sections" ? true : false,
    });

  const section = contents[id] || {};
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState(
    section.style || { background: "white", color: "black" }
  );

  useEffect(() => {
    if (isSelected && currentStyle) {
      let updatedStyle = { ...style };

      const properties = [
        "background",
        "align",
        "position",
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

  const styles = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: style?.width || "100%",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 10,
    color: style?.color ?? "black",
    background: style?.background || "white",
    outline: hovered && editor ? "2px dashed #999" : "none",
    marginRight: style?.align === "left" ? "auto" : "",
    marginLeft: style?.align === "right" ? "auto" : "",
    margin: !style?.align || style?.align === "center" ? "0 auto" : "",
    marginTop: style?.marginTop || "",
    marginBottom: style?.marginBottom || "",
    ...(style?.borderSelect !== "select" && {
      border: `${style?.borderSize || "0px"} ${style?.borderType || "solid"} ${
        style?.borderColor || "#ddd"
      }`,
    }),
    ...(style?.borderSelect === "select" && {
      borderTop: `${style?.borderTop || "0px"} ${
        style?.borderType || "solid"
      } ${style?.borderColor || "#ddd"}`,
      borderBottom: `${style?.borderBottom || "0px"} ${
        style?.borderType || "solid"
      } ${style?.borderColor || "#ddd"}`,
      borderLeft: `${style?.borderLeft || "0px"} ${
        style?.borderType || "solid"
      } ${style?.borderColor || "#ddd"}`,
      borderRight: `${style?.borderRight || "0px"} ${
        style?.borderType || "solid"
      } ${style?.borderColor || "#ddd"}`,
    }),
    ...(style?.radiusSelect !== "select" && {
      borderRadius: style?.borderRadius || "0px",
    }),
    ...(style?.radiusSelect === "select" && {
      borderTopLeftRadius: style?.borderTopLeftRadius || "0px",
      borderTopRightRadius: style?.borderTopRightRadius || "0px",
      borderBottomLeftRadius: style?.borderBottomLeftRadius || "0px",
      borderBottomRightRadius: style?.borderBottomRightRadius || "0px",
    }),
    ...(style?.paddingSelect !== "select" && {
      padding: style?.padding || "0px",
    }),
    ...(style?.paddingSelect === "select" && {
      paddingLeft: style?.paddingLeft || "0px",
      paddingRight: style?.paddingRight || "0px",
      paddingTop: style?.paddingTop || "0px",
      paddingBottom: style?.paddingBottom || "0px",
    }),
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
                  <div
                    className="buttonContainerOpened"
                    style={{ marginTop: "144px" }}
                  >
                    <div className="textButtonContainer">Section</div>

                    <div className="buttonContainerWrapper">
                      <div
                        className="button buttonDrag"
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Drag section"
                        onMouseEnter={() =>
                          !dragging && setDragMode("sections")
                        }
                      >
                        <RiDragMove2Line />
                      </div>

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
                          setSelectedContainer({ id: id, type: "Section" });
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

                      <div className="button buttonOpzColumn">&nbsp;</div>
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
