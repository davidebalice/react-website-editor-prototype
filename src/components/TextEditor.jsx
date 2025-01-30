import React from "react";
import { IoMdSave } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const TextEditor = ({
  isTextEditing,
  setIsTextEditing,
  selectedContainer,
  setFields,
  setContents,
  setDragMode,
  selectedText,
  setSelectedText,
  handleKeyPress,
  setUpdateText,
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
    if (selectedContainer.type === "Image") {
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
    }
    setSelectedText("");
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
