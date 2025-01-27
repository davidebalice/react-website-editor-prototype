import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { RiDragMove2Line } from "react-icons/ri";

const Content = React.memo(
  ({
    id,
    view,
    columnId,
    children,
    content,
    isSelected,
    currentStyle,
    setSelectedContainer,
    setCurrentStyle,
    editor,
    handleDeleteContent,
    i,
    j,
    setSidebar,
    dragMode,
    setDragMode,
    dragging,
    field,
    handleOrderContent,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id,
        disabled: dragMode === "none" || dragMode !== "contents" ? true : false,
      });
    const [style, setStyle] = useState(content.style || {});
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (isSelected && currentStyle) {
        let updatedStyle = { ...style };

        const properties = [
          "background",
          "align",
          "position",
          "color",
          "fontFamily",
          "fontSize",
          "textAlign",
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
      flex: 1,
      overflow: "hidden",
      flexWrap: "wrap",
      alignItems: "center",
      userSelect: "none",
      cursor: "grab",
      boxSizing: "border-box",
      minHeight: 10,
      color: style?.color ?? "#222222",
      outline: hovered && editor ? "2px dashed #999" : "none",
      width:
        view === "mobile" || view === "tablet"
          ? style?.mobileWidth || "100%"
          : style?.width || "100%",
      height: style?.height || "",
      maxWidth: style?.maxWidth || "auto",
      textAlign: style?.textAlign === "" ? "left" : style?.textAlign,
      marginRight: style?.position === "left" ? "auto" : "",
      marginLeft: style?.position === "right" ? "auto" : "",
      margin: !style?.position || style?.position === "center" ? "0 auto" : "",
      marginTop: style?.marginTop || "",
      marginBottom: style?.marginBottom || "",
      fontFamily: style?.fontFamily || "",
      ...(field?.type !== "icon" && {
        boxShadow: style?.boxShadow || "",
      }),
      ...(field?.type !== "icon" && {
        background: style?.background || "white",
      }),
      ...(style?.borderSelect !== "select" && {
        border: `${style?.borderSize || "0px"} ${
          style?.borderType || "solid"
        } ${style?.borderColor || "#ddd"}`,
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

    const dragIconStyle = {
      cursor: "grab",
      userSelect: "none",
      position: "relative",
    };

    return (
      <div
        ref={setNodeRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div {...listeners} {...attributes} style={dragIconStyle}>
          {editor && field && (hovered || j === 0) && (
            <div
              className={`flex buttonContainer ${
                i === 0 && j === 0
                  ? "buttonContentContainer1"
                  : i > 0 && j === 0
                  ? "buttonContentContainer2"
                  : "buttonContentContainer"
              }`}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <HiTemplate style={{ fontSize: "20px" }} />

              {open && (
                <>
                  <div
                    className="buttonContainerOpened"
                    style={{ marginTop: "144px" }}
                  >
                    <div className="textButtonContainer">
                      {field?.type.charAt(0).toUpperCase() +
                        field?.type.slice(1) || " - "}
                    </div>

                    <div className="buttonContainerWrapper">
                      <div
                        className="button buttonDrag"
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Drag content"
                        onMouseEnter={() =>
                          !dragging && setDragMode("contents")
                        }
                      >
                        <RiDragMove2Line />
                      </div>

                      <button
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Options"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          setSelectedContainer({
                            id: id,
                            type:
                              field?.type.charAt(0).toUpperCase() +
                                field?.type.slice(1) || null,
                          });
                          setCurrentStyle(style);
                          setSidebar(true);
                        }}
                        className="button buttonOpzContent"
                      >
                        <HiMiniCog6Tooth />
                      </button>

                      <button
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Delete"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          handleDeleteContent(id);
                        }}
                        className="button buttonDeleteContent"
                      >
                        <FaRegTrashAlt />
                      </button>

                      <button
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Delete"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          handleOrderContent(columnId, id, "up");
                        }}
                        className="button buttonDeleteContent"
                      >
                        <FaRegTrashAlt />
                      </button>

                      <button
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Delete"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          handleOrderContent(columnId, id, "down");
                        }}
                        className="button buttonDeleteContent"
                      >
                        <FaRegTrashAlt />
                      </button>

                      <button className="button buttonDeleteContent">
                        &nbsp;
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div style={styles}>{children}</div>
      </div>
    );
  }
);

export default Content;
