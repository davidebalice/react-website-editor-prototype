import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

// Aggiungi l'icona per il drag
const SortableItem = React.memo(({ id, children, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    boxSizing: "border-box",
    background: "white",
    border: "2px solid red",
  };

  // Stile per l'icona che avvia il drag
  const dragIconStyle = {
    cursor: "grab",
    padding: "5px",
    marginRight: "10px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={itemStyle}>
      {/* Icona per avviare il drag */}
      <div {...listeners} {...attributes} style={dragIconStyle}>
        <span>:::</span> {/* Puoi sostituire con l'icona che preferisci */}
      </div>

      {/* Contenuto dell'item */}
      <div>{children}</div>
    </div>
  );
});

export default SortableItem;
