import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import Column from "./components/Column.jsx";
import Container from "./components/Container.jsx";
import Content from "./components/Content.jsx";
import FieldRenderer from "./components/FieldRenderer.jsx";
import Section from "./components/Section.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import data from "./data/home.js";
import "./styles.css";

const App = () => {
  const [view, setView] = useState("desktop");
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      shouldStartDrag: (event) => {
        return event.target.tagName !== "BUTTON";
      },
    })
  );

  const [currentStyle, setCurrentStyle] = useState({});
  const [selectedContainer, setSelectedContainer] = useState(null);

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
    console.log("active.id");
    console.log(active.id);
  };

  const { idArrays, idTypes } = processView(data);
  const [items, setItems] = useState(idArrays || []);
  const pageId = data.pageData._id;
  const pageStyle = data.pageData?.style || {};

  console.log({ data, idArrays });
  useEffect(() => console.log({ items }), [items]);

  const handleAddContent = (widgetId) => {
    const newContentId = `new-content-${Date.now()}`;
    const newContent = {
      id: newContentId,
      type: "field",
      content: "Nuovo contenuto",
    };

    setItems((prevItems) => {
      return {
        ...prevItems,
        [widgetId]: [...prevItems[widgetId], newContentId],
      };
    });
  };

  const handleAddColumn = (sectionId) => {
    const newColumnId = `column-${Date.now()}`; // Creiamo un ID unico per la colonna
    const newColumn = {
      id: newColumnId,
      type: "column", // Tipo della colonna
      content: "Nuovo contenuto della colonna", // Puoi personalizzare il contenuto
    };

    setItems((prevItems) => {
      const section = prevItems[sectionId];
      return {
        ...prevItems,
        [sectionId]: {
          ...section,
          columns: [...section.columns, newColumnId], // Aggiungiamo l'ID della colonna alla sezione
        },
      };
    });
  };
  console.log("Struttura attuale di items:", items);

  const newSectionId = `section-${Date.now()}`;
  const newItemId = `item-${Date.now()}`;

  const newSection = {
    _id: newSectionId,
    layout: "one_column_layout",
    label: {
      value: "New Section",
      override: true,
    },
    content: [
      {
        position: "default",
        widgets: [newItemId],
      },
    ],
    style: {
      background: "blue",
      color: "white",
    },
  };
  /*
  const handleAddSection = () => {
    if (!pageId || !items[pageId]) {
      setItems((prevItems) => ({
        ...prevItems,
        [pageId]: [newSection],
      }));
    } else {
      setItems((prevItems) => ({
        ...prevItems,
        [pageId]: [...prevItems[pageId], newSection],
      }));
    }
  };
*/
  const handleAddSection = () => {
    setItems((prevItems) => ({
      ...prevItems,
      [pageId]: [...prevItems[pageId], newSectionId],
      [newSectionId]: newSectionId,
    }));
  };

  console.log("items::::::::::::");
  console.log(items);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {selectedContainer}

      <Topbar view={view} setView={setView} />

      <Sidebar
        id={selectedContainer}
        pageStyle={pageStyle}
        currentStyle={currentStyle}
        setCurrentStyle={setCurrentStyle}
      />

      <div className={`siteContainer ${view === "mobile" ? "mobile" : ""}`}>
        <Container
          id={pageId}
          items={items[pageId]}
          className="siteContainer"
          pageStyle={pageStyle}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
          setSelectedContainer={setSelectedContainer}
          isSelected={selectedContainer === pageId}
        >
          {items[pageId] &&
            items[pageId].map((section) => {
              return (
                <Section
                  id={section}
                  items={items[section]}
                  key={section}
                  currentStyle={currentStyle}
                  setCurrentStyle={setCurrentStyle}
                  setSelectedContainer={setSelectedContainer}
                  isSelected={selectedContainer === section}
                  idTypes={idTypes}
                >
                  <button onClick={() => handleAddSection()}>
                    Aggiungi sezione
                  </button>

                  <div className="wrapper">
                    {items[section] &&
                      items[section].map((widget) => {
                        return (
                          <>
                            <button onClick={() => handleAddColumn(widget)}>
                              Aggiungi colonna
                            </button>
                            <Column
                              id={widget}
                              items={items[widget]}
                              key={widget}
                              currentStyle={currentStyle}
                              setCurrentStyle={setCurrentStyle}
                              setSelectedContainer={setSelectedContainer}
                              isSelected={selectedContainer === widget}
                              idTypes={idTypes}
                            >
                              {items[widget] &&
                                items[widget].map((field) => (
                                  <>
                                    <button
                                      onClick={() => handleAddContent(widget)}
                                    >
                                      Aggiungi Contenuto
                                    </button>

                                    <Content
                                      key={field}
                                      id={field}
                                      activeId={activeId}
                                      currentStyle={currentStyle}
                                      setCurrentStyle={setCurrentStyle}
                                      setSelectedContainer={
                                        setSelectedContainer
                                      }
                                      isSelected={selectedContainer === field}
                                      idTypes={idTypes}
                                    >
                                      <FieldRenderer
                                        fieldId={field}
                                        viewData={data}
                                        activeId={activeId}
                                      />
                                    </Content>
                                  </>
                                ))}
                            </Column>{" "}
                          </>
                        );
                      })}
                  </div>
                </Section>
              );
            })}
        </Container>
      </div>

      {idTypes[activeId]?.type === "field" ? (
        <DragOverlay>
          {activeId ? (
            <div
              style={{
                padding: "20px",
                border: "2px dashed gray",
                background: "lightgray",
                cursor: "grabbing",
              }}
            >
              {idTypes[activeId]?.type
                ? `Dragging ${idTypes[activeId].type}: ${idTypes[activeId].name}`
                : `Dragging ${activeId}`}
            </div>
          ) : null}
        </DragOverlay>
      ) : null}
    </DndContext>
  );

  function findContainer(id, items) {
    return Object.keys(items).find((key) => items[key]?.includes(id)) || null;
  }

  function handleDragOver({ active, over }) {
    if (!active || !over) {
      console.warn("Active or Over is null or undefined", { active, over });
      return;
    }

    const id = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = findContainer(id, items);
    const overContainer = findContainer(overId, items);

    console.log({
      id: idTypes[id] ? idTypes[id].name : null,
      overId: idTypes[overId] ? idTypes[overId].name : null,
      activeContainer: idTypes[activeContainer]
        ? idTypes[activeContainer].name
        : null,
      overContainer: idTypes[overContainer]
        ? idTypes[overContainer].name
        : null,
    });

    //Do nothing if haven't moved out of current container
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    //Move item to new container for the right container type
    if (
      idTypes[id] &&
      idTypes[overContainer] &&
      idTypes[id].container === idTypes[overContainer].type
    ) {
      setItems((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];

        // Find the indexes for the items
        const activeIndex = activeItems.indexOf(id);
        const overIndex = overItems.indexOf(overId);

        let newIndex;

        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item !== active.id),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...prev[overContainer].slice(newIndex, prev[overContainer].length),
          ],
        };
      });

      return;
    }

    //Move item to new container for the right container type
    if (
      idTypes[id] &&
      idTypes[overId] &&
      idTypes[id].container === idTypes[overId].type &&
      !items[overId].length
    ) {
      setItems((prev) => {
        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item !== active.id),
          ],
          [overId]: [active.id],
        };
      });

      return;
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id, items);
    const overContainer = findContainer(overId, items);

    console.log({
      id: idTypes[id] ? idTypes[id].name : null,
      overId: idTypes[overId] ? idTypes[overId].name : null,
      activeContainer: idTypes[activeContainer]
        ? idTypes[activeContainer].name
        : null,
      overContainer: idTypes[overContainer]
        ? idTypes[overContainer].name
        : null,
    });

    //Only move if it's within the same container, HandleDragOver should have handled the moves between containers
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

  function processView(view) {
    const { pageData, sectionData, widgetData, fieldDefinitions, fieldData } =
      view;

    const idArrays = {},
      idTypes = {};

    idArrays[pageData._id] = sectionData.map((section) => section._id);
    idTypes[pageData._id] = {
      type: "page",
      container: "",
      name: pageData.title,
    };

    sectionData.forEach((section, index) => {
      idArrays[section._id] = section.content.map(
        (widget) => widget.widgets[0]
      );
      idTypes[section._id] = {
        type: "section",
        container: "page",
        name: `section ${index}`,
        style: section.style,
      };
    });

    widgetData.forEach((widget, index) => {
      idArrays[widget._id] = widget.fields;
      idTypes[widget._id] = {
        type: "widget",
        container: "section",
        name: `widget ${index}`,
        style: widget.style,
      };
    });

    fieldDefinitions.forEach((field) => {
      idTypes[field._id] = {
        type: "field",
        container: "widget",
        name: field.label.value,
        style: field.style,
      };
    });

    return { idArrays, idTypes };
  }
};

export default App;
