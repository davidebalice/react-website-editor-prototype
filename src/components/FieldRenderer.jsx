import React from "react";
import "tailwindcss/tailwind.css";

const FieldRenderer = ({ field, activeId }) => {
  if (!field) {
    return null;
  }

  const itemStyle = {
    display: "flex",
    flexDirection: "row",
    transition: "transform 0.2s ease",
  };


  if (field) {
    switch (field.type) {
      case "text":
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <span className="mx-auto">{field.value}</span>
            </div>
          </div>
        );
      case "reference":
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <div
                className="mx-auto"
                dangerouslySetInnerHTML={{ __html: field.name }}
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div style={itemStyle}>
            <div
              style={itemStyle}
              className="bg-white dark:bg-gray_800 flex relative items-center p-1 font-semibold text-sm text-center"
            >
              <img src={field.value} alt={field.name} width="200" />
            </div>
          </div>
        );
      default:
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <span className="mx-auto">{field.value}</span>
            </div>
          </div>
        );
    }
  }
};

export default FieldRenderer;
