import React from "react";
import { IoMdSave } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const TextEditor = ({
  view,
  isTextEditing,
  setIsTextEditing,
  selectedContainer,
  text,
  handleMouseEnter,
  handleMouseLeave,
  content,
  setFields,
  setContents,
  activeId,
  style,
  itemStyle,
  isHovered,
  handleEditing,
  setDragMode,
  selectedText,
  setSelectedText,
  handleKeyPress,
  setUpdateText,
  contents,
}) => {
  const handleChange = (value) => {
    setSelectedText(value);
  };

  const handleTextSave = () => {
    setIsTextEditing(false);
    setDragMode("Sections");
    setFields((prevFields) => {
      return prevFields.map((f) => {
        if (selectedContainer.type === "Image") {
          if (selectedContainer.id === f.field_ref) {
            return {
              ...f,
              text: {
                value: selectedText,
              },
            };
          }
        } else {
          if (selectedContainer.id === f.field_ref) {
            return {
              ...f,
              value: selectedText,
            };
          }
        }
        return f;
      });
    });

    setContents((prevContents) => {
      if (!prevContents || typeof prevContents !== "object") {
        return prevContents;
      }

      const updatedEntries = Object.entries(prevContents).map(
        ([key, value]) => {
          if (value && typeof value === "object") {

            if (value.name === selectedContainer.name) {
              return [
                key,
                {
                  ...value,
                  text: {
                    value: selectedText,
                  },
                },
              ];
            }
          }

          return [key, value];
        }
      );

      const updatedContents = Object.fromEntries(updatedEntries);

      return updatedContents;
    });

    setUpdateText(false);
  };

  return (
    <div>
      {isTextEditing && (
        <>
          <div className="textEditorOverlay">
            <div className="textEditor">
              <ReactQuill
                value={selectedText}
                onChange={handleChange}
                theme="snow"
                placeholder=""
                onKeyPress={handleKeyPress}
                className="quillEditor"
              />
              <button onClick={handleTextSave} className="flex textSave">
                <IoMdSave style={{ fontSize: "16px" }} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;
