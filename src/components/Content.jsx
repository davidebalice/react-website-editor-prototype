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

        if (
          currentStyle.background &&
          currentStyle.background !== updatedStyle.background
        ) {
          updatedStyle.background = currentStyle.background;
        }

        if (currentStyle.align && currentStyle.align !== updatedStyle.align) {
          updatedStyle.align = currentStyle.align;
        }

        if (
          currentStyle.position &&
          currentStyle.position !== updatedStyle.position
        ) {
          updatedStyle.position = currentStyle.position;
        }

        if (currentStyle.color && currentStyle.color !== updatedStyle.color) {
          updatedStyle.color = currentStyle.color;
        }

        if (
          currentStyle.fontFamily &&
          currentStyle.fontFamily !== updatedStyle.fontFamily
        ) {
          updatedStyle.fontFamily = currentStyle.fontFamily;
        }

        if (
          currentStyle.fontSize &&
          currentStyle.fontSize !== updatedStyle.fontSize
        ) {
          updatedStyle.fontSize = currentStyle.fontSize;
        }

        if (currentStyle.width && currentStyle.width !== updatedStyle.width) {
          updatedStyle.width = currentStyle.width;
        }

        if (currentStyle.width && currentStyle.width !== updatedStyle.width) {
          updatedStyle.width = currentStyle.width;
        }










/*
        border: style?.selectBorder ? style?.border : undefined,
        borderTop: !style?.selectBorder ? style?.borderTop : undefined,
        borderBottom: !style?.selectBorder ? style?.borderBottom : undefined,
        borderLeft: !style?.selectBorder ? style?.borderLeft : undefined,
        borderRight: !style?.selectBorder ? style?.borderRight : undefined,
        borderRadius: !style?.selectRadius ? style?.borderRadius : undefined,
        borderTopLeftRadius: !style?.selectRadius
          ? style?.borderTopLeftRadius
          : undefined,
        borderTopRightRadius: !style?.selectRadius
          ? style?.borderTopRightRadius
          : undefined,
        borderBottomLeftRadius: !style?.selectRadius
          ? style?.borderBottomLeftRadius
          : undefined,
        borderBottomRightRadius: !style?.selectRadius
          ? style?.borderBottomRightRadius
          : undefined,

*/







        setStyle(updatedStyle);
      }
    }, [isSelected, currentStyle]);

    const styles = {
      transform: CSS.Translate.toString(transform),
      transition,
      flex: 1,
      flexWrap: "wrap",
      alignItems: "center",
      userSelect: "none",
      cursor: "grab",
      boxSizing: "border-box",
      minHeight: 20,
      color: style?.color ?? "#222222",
      background: style?.background || "white",
      border: !style?.selectBorder ? style?.border : undefined,
      borderTop: style?.selectBorder ? style?.borderTop : undefined,
      borderBottom: style?.selectBorder ? style?.borderBottom : undefined,
      borderLeft: style?.selectBorder ? style?.borderLeft : undefined,
      borderRight: style?.selectBorder ? style?.borderRight : undefined,
      borderRadius: !style?.selectRadius ? style?.borderRadius : undefined,
      borderTopLeftRadius: style?.selectRadius
        ? style?.borderTopLeftRadius
        : undefined,
      borderTopRightRadius: style?.selectRadius
        ? style?.borderTopRightRadius
        : undefined,
      borderBottomLeftRadius: style?.selectRadius
        ? style?.borderBottomLeftRadius
        : undefined,
      borderBottomRightRadius: style?.selectRadius
        ? style?.borderBottomRightRadius
        : undefined,

      outline: hovered && editor ? "2px dashed #999" : "none",
      width: style?.width || "100%",
      height: style?.height || "",
      maxWidth: style?.maxWidth || "auto",
      textAlign: style?.align === "" ? "left" : style?.align,
      marginRight: style?.position === "left" ? "auto" : "",
      marginLeft: style?.position === "right" ? "auto" : "",
      margin: !style?.position || style?.position === "center" ? "0 auto" : "",
      marginTop: style?.marginTop || "",
      marginBottom: style?.marginBottom || "",
      fontFamily: style?.fontFamily || "",
    };

    const wrapperStyles = { padding: 10 };

    const dragIconStyle = {
      cursor: "grab",
      userSelect: "none",
      position: "relative",
    };

    return (
      <div
        ref={setNodeRef}
        style={styles}
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
                  <div className="buttonContainerOpened">
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
        <div style={wrapperStyles}>{children}</div>
      </div>
    );
  }
);

export default Content;
