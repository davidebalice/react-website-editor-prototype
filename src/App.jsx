import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";

import Container from "./Container";
import FieldRenderer from "./FieldRenderer";
import SortableItem from "./SortableItem";
import data from "./data.js";

const App = () => {
  const [activeId, setActiveId] = useState(null);
  /*
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

*/
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
    console.log("active.id");
    console.log(active.id);
  };

  const wrapperStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "2px solid yellow",
  };

  const { idArrays, idTypes } = processView(data);

  console.log({ data, idArrays });

  const [items, setItems] = useState(idArrays);

  useEffect(() => console.log({ items }), [items]);

  const pageId = data.pageData._id;

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Container id={pageId} items={items[pageId]}>
        {items[pageId] &&
          items[pageId].map((section) => {
            return (
              <Container
                id={section}
                items={items[section]}
                key={section}
                type="section"
              >
                <div style={wrapperStyle}>
                  {items[section] &&
                    items[section].map((widget) => {
                      return (
                        <Container
                          id={widget}
                          items={items[widget]}
                          key={widget}
                          type="column"
                        >
                          {items[widget] &&
                            items[widget].map((field) => (
                              <SortableItem
                                key={field}
                                id={field}
                                activeId={activeId}
                              >
                                <FieldRenderer
                                  fieldId={field}
                                  viewData={data}
                                  activeId={activeId}
                                />
                              </SortableItem>
                            ))}
                        </Container>
                      );
                    })}
                </div>
              </Container>
            );
          })}
      </Container>
      {/* <DragOverlay>
          {activeId ? <SortableItem key={activeId} id={activeId} /> : null}
        </DragOverlay> */}
    </DndContext>
  );

  function findContainer(id, items) {
    return Object.keys(items).find((key) => items[key]?.includes(id)) || null;
  }

  function handleDragOver({ active, over }) {
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

    // setActiveId(null);
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
      };
    });

    widgetData.forEach((widget, index) => {
      idArrays[widget._id] = widget.fields;
      idTypes[widget._id] = {
        type: "widget",
        container: "section",
        name: `widget ${index}`,
      };
    });

    fieldDefinitions.forEach((field) => {
      idTypes[field._id] = {
        type: "field",
        container: "widget",
        name: field.label.value,
      };
    });

    return { idArrays, idTypes };
  }
};

export default App;
