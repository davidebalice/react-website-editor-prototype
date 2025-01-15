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
  const [editor, setEditor] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

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

  const { idArrays, idTypes, fieldData, fieldDefinitions } = processView(data);
  const [items, setItems] = useState(idArrays || []);
  const [contents, setContents] = useState(idTypes || []);
  const [fields, setFields] = useState(fieldData || []);
  const [fieldsDetails, setFieldsDetails] = useState(fieldDefinitions || []);
  const pageId = data.pageData._id;
  const pageStyle = data.pageData?.style || {};

  console.log({ data, idArrays });
  useEffect(() => console.log({ items }), [items]);

  const handleAddContent = (columnId) => {
    const newContentId = `new-content-${Date.now()}`;
    const field1Id = generateUniqueId();

    const newContent = {
      type: "field",
      name: "Lorem ipsum",
      container: "column",
      style: { border: "1px solid red" },
    };

    setItems((prevItems) => {
      return {
        ...prevItems,
        [columnId]: [...prevItems[columnId], field1Id],
      };
    });

    setContents((prevContents) => {
      return {
        ...prevContents,
        [newContentId]: newContent,
      };
    });

    setFields((prevFields) => {
      return [
        ...prevFields,
        {
          _id: newContentId,
          field_ref: field1Id,
          page: pageId,
          type: "text",
          value: "lorem ipsum 1",
        },
      ];
    });
  };

  const handleAddColumn = (sectionId) => {
    const column1Id = generateUniqueId();
    const field1Id = generateUniqueId();
    const fielddata1Id = generateUniqueId();

    setItems((prevItems) => ({
      ...prevItems,
      [sectionId]: [...prevItems[sectionId], column1Id],
      [column1Id]: [field1Id],
    }));

    setContents((prevContents) => {
      return {
        ...prevContents,
        [column1Id]: newColumn,
        [field1Id]: newField,
      };
    });

    setFields((prevFields) => {
      return [
        ...prevFields,
        {
          _id: fielddata1Id,
          field_ref: field1Id,
          page: pageId,
          type: "text",
          value: "lorem ipsum 1",
        },
      ];
    });
  };

  const newSectionId = `section-${Date.now()}`;

  const newColumn = {
    container: "section",
    name: "column 1",
    type: "column",
    style: {
      background: "f1f1f1",
      color: "ddd",
    },
  };

  const newField = {
    container: "column",
    name: "aaa",
    type: "field",
    style: {
      background: "blue",
      color: "white",
    },
  };

  const handleAddSection = (afterSectionId = null) => {
    const column1Id = generateUniqueId();
    const column2Id = generateUniqueId();
    const field1Id = generateUniqueId();
    const field2Id = generateUniqueId();
    const fielddata1Id = generateUniqueId();
    const fielddata2Id = generateUniqueId();

    setItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (afterSectionId && updatedItems[pageId]) {
        const sectionIndex = updatedItems[pageId].indexOf(afterSectionId);
        if (sectionIndex !== -1) {
          updatedItems[pageId].splice(sectionIndex + 1, 0, newSectionId);
        } else {
          updatedItems[pageId].push(newSectionId);
        }
      } else {
        updatedItems[pageId] = [...(updatedItems[pageId] || []), newSectionId];
      }

      updatedItems[newSectionId] = [column1Id, column2Id];
      updatedItems[column1Id] = [field1Id];
      updatedItems[column2Id] = [field2Id];

      return updatedItems;
    });

    setContents((prevContents) => {
      return {
        ...prevContents,
        [column1Id]: newColumn,
        [column2Id]: newColumn,
        [field1Id]: newField,
        [field2Id]: newField,
      };
    });

    setFields((prevFields) => {
      return [
        ...prevFields,
        {
          _id: fielddata1Id,
          field_ref: field1Id,
          page: pageId,
          type: "text",
          value: "lorem ipsum 1",
        },
        {
          _id: fielddata2Id,
          field_ref: field2Id,
          page: pageId,
          type: "text",
          value: "lorem ipsum 2",
        },
      ];
    });
  };

  console.log("items::::::::::::");
  console.log(items);
  console.log("contents::::::::::::");
  console.log(contents);
  console.log("fields::::::::::::");
  console.log(fields);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {selectedContainer}
      activeid: {activeId}
      <Topbar
        view={view}
        setView={setView}
        editor={editor}
        setEditor={setEditor}
      />
      <Sidebar
        id={selectedContainer}
        pageStyle={pageStyle}
        currentStyle={currentStyle}
        setCurrentStyle={setCurrentStyle}
        editor={editor}
        setEditor={setEditor}
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
                  items={items[section] || []}
                  key={section}
                  currentStyle={currentStyle}
                  setCurrentStyle={setCurrentStyle}
                  setSelectedContainer={setSelectedContainer}
                  isSelected={selectedContainer === section}
                  contents={contents}
                  editor={editor}
                  setEditor={setEditor}
                >
                  {editor && (
                    <button onClick={() => handleAddSection(section)}>
                      Aggiungi sezione
                    </button>
                  )}

                  <div className="wrapper">
                    {Array.isArray(items[section]) &&
                      (items[section] || []).map((column) => {
                        return (
                          <>
                            <Column
                              id={column}
                              items={items[column]}
                              key={column}
                              currentStyle={currentStyle}
                              setCurrentStyle={setCurrentStyle}
                              setSelectedContainer={setSelectedContainer}
                              isSelected={selectedContainer === column}
                              contents={contents}
                              editor={editor}
                              setEditor={setEditor}
                            >
                              {editor && (
                                <button
                                  onClick={() => handleAddColumn(section)}
                                  className="buttonAddColumn"
                                >
                                  Aggiungi colonna
                                </button>
                              )}

                              {items[column] &&
                                items[column].map((field, i) => (
                                  <>
                                    {i === 0 && editor && (
                                      <button
                                        onClick={() => handleAddContent(column)}
                                        className="buttonAddContent"
                                      >
                                        Aggiungi Contenuto
                                      </button>
                                    )}

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
                                      contents={contents}
                                      editor={editor}
                                      setEditor={setEditor}
                                    >
                                      <FieldRenderer
                                        fieldId={field}
                                        field={fields.find(
                                          (f) => f.field_ref === field
                                        )}
                                        activeId={activeId}
                                      />
                                    </Content>
                                  </>
                                ))}
                            </Column>
                          </>
                        );
                      })}
                  </div>
                </Section>
              );
            })}
        </Container>
      </div>
      {contents[activeId]?.type === "field" ? (
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
              {contents[activeId]?.type
                ? `Dragging ${contents[activeId].type}: ${contents[activeId].name}`
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
      id: contents[id] ? contents[id].name : null,
      overId: contents[overId] ? contents[overId].name : null,
      activeContainer: contents[activeContainer]
        ? contents[activeContainer].name
        : null,
      overContainer: contents[overContainer]
        ? contents[overContainer].name
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
      contents[id] &&
      contents[overContainer] &&
      contents[id].container === contents[overContainer].type
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
      contents[id] &&
      contents[overId] &&
      contents[id].container === contents[overId].type &&
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
      id: contents[id] ? contents[id].name : null,
      overId: contents[overId] ? contents[overId].name : null,
      activeContainer: contents[activeContainer]
        ? contents[activeContainer].name
        : null,
      overContainer: contents[overContainer]
        ? contents[overContainer].name
        : null,
    });

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
    const { pageData, sectionData, columnData, fieldData, fieldDefinitions } =
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
        (column) => column.columns[0]
      );
      idTypes[section._id] = {
        type: "section",
        container: "page",
        name: `section ${index}`,
        style: section.style,
      };
    });

    columnData.forEach((column, index) => {
      idArrays[column._id] = column.fields;
      idTypes[column._id] = {
        type: "column",
        container: "section",
        name: `column ${index}`,
        style: column.style,
      };
    });

    fieldDefinitions.forEach((field) => {
      idTypes[field._id] = {
        type: "field",
        container: "column",
        name: field.label.value,
        style: field.style,
      };
    });

    return { idArrays, idTypes, fieldData, fieldDefinitions };
  }
};

export default App;
