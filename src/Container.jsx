//<Container id={container} items={items[container]} key={container} />

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function Container({ id, items, children, type }) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id });

  const containerStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 15,
    margin: 5,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    border: type === "section" ? "1px solid green" : "1px solid blue",
    borderRadius: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    minHeight: 100,
    background: isOver ? "green" : "#dadada",
  };

  return (
    <SortableContext
      id={id}
      items={items}
      //strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={containerStyle}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    </SortableContext>
  );
}
