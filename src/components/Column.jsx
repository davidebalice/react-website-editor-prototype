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
  dragMode,
  setDragMode,
  dragging,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled: dragMode === "none" || dragMode !== "columns" ? true : false,
    });

  const column = contents?.[id] || {};
  const [style, setStyle] = useState(column.style || {});
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isSelected && currentStyle) {
      let updatedStyle = { ...style };

      const properties = [
        "background",
        "align",
        "position",
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
    flexWrap: "wrap",
    alignItems: "center",
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 10,
    color: style?.color ?? "black",
    background: style?.background || "white",
    width: style?.width || "100%",
    outline: hovered && editor ? "2px dashed #999" : "none",
    textAlign: !style?.textAlign ? "left" : style?.textAlign,
    marginRight: style?.position === "left" ? "auto" : "",
    marginLeft: style?.position === "right" ? "auto" : "",
    margin: !style?.position || style?.position === "center" ? "0 auto" : "",
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
                      onMouseEnter={() => !dragging && setDragMode("columns")}
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
                        setSelectedContainer({ id: id, type: "Column" });
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
