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
    contents,
    isSelected,
    currentStyle,
    setSelectedContainer,
    setCurrentStyle,
    editor,
    handleDeleteContent,
    i,
    j,
    setSidebar,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const content = contents?.[id] || {};
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

    console.log(content.style);

    const styles = {
      transform: CSS.Transform.toString(transform),
      transition,
      flex: 1,
      flexWrap: "wrap",
      alignItems: "center",
      userSelect: "none",
      cursor: "grab",
      boxSizing: "border-box",
      minHeight: 30,
      color: style?.color ?? "black",
      background: style?.background || "white",
      border: style?.border || "none",
      outline: hovered && editor ? "2px dashed #999" : "none",
      width: style?.width || "100%",
      maxWidth: style?.maxWidth || "auto",
      align: style?.align || "left",






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
          {editor && (hovered || j === 0) && (
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
                    <div className="textButtonContainer">Content</div>

                    <div className="buttonContainerWrapper">
                      <div
                        className="button buttonDrag"
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Drag content"
                      >
                        <RiDragMove2Line />
                      </div>

                      <button
                        data-tooltip-id="tooltip-global"
                        data-tooltip-content="Options"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          setSelectedContainer(id);
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
