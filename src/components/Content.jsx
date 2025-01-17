import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { RiDragMove2Line } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";


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
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const content = contents?.[id] || {};
    const [hovered, setHovered] = useState(false);
    const [style, setStyle] = useState(content.style || {});

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
      borderRadius: 5,
      userSelect: "none",
      cursor: "grab",
      boxSizing: "border-box",
      minHeight: 100,
      color: style?.color ?? "black",
      background: hovered && editor ? "#f0f5fa" : style?.background ?? "white",
    };

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
          {editor && hovered && (
            <div className="flex buttonContainer buttonContentContainer">
              <div className="textButtonContainer">Content</div>
              <div className="spacerButtonContainer">
                <div>
                  <RxDividerVertical />
                </div>
              </div>
              <div className="button buttonDrag" data-tooltip-id="tooltip-global"
                data-tooltip-content="Drag content">
                <RiDragMove2Line />
              </div>
              <button
                data-tooltip-id="tooltip-global"
                data-tooltip-content="Options"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  setSelectedContainer(id);
                  setCurrentStyle(style);
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
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    );
  }
);

export default Content;
