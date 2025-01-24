import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

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
  editor,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: true });

  const [style, setStyle] = useState(pageStyle);

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
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 100,
    color: style?.color ?? "black",
    background: style?.background ?? "white",
    width: style?.width || "100%",
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
      <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
        {children}
      </div>
    </SortableContext>
  );
}
