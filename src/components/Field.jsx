import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Field = ({ field, editor, setFields, activeId }) => {
  const fileRepositoryUrl = process.env.REACT_APP_FILE_REPOSITORY;
  const [text, setText] = useState(field?.value ?? "");
  const [isEditing, setIsEditing] = useState(false);

  /*
  useEffect(() => {
    setIsEditing(false);
  }, [editor]);
*/
  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    setIsEditing(false);

    setFields((prevFields) => {
      return prevFields.map((f) => {
        if (field._id === f._id) {
          return {
            ...f,
            value: text,
          };
        }
        return f;
      });
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleEditing = () => {
    if (editor) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleMouseDown = (e) => {
    if (window.getSelection().toString()) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isEditing]);

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
          <div style={itemStyle}>
            {!isEditing ? (
              <div
                onClick={() => handleEditing()}
                style={{
                  cursor: "pointer",
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ) : (
              <div style={{ width: "100%" }}>
                <ReactQuill
                  value={text}
                  onChange={handleChange}
                  theme="snow"
                  placeholder=""
                  onKeyPress={handleKeyPress}
                  style={{
                    zIndex: 200,
                    position: "relative",
                    background: "white",
                    width: "100%",
                    height: "70px",
                    padding: "4px",
                    fontSize: "13px",
                  }}
                />
                <button
                  onClick={handleSave}
                  style={{
                    marginTop: "38px",
                    marginLeft: "3px",
                    padding: "3px 9px",
                    backgroundColor: "#222222",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        );

      case "reference":
        return (
          <div style={itemStyle}>
            <div>
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
            <img
              src={`${fileRepositoryUrl}${field.value}`}
              alt={field.name}
              width="100%"
            />
          </div>
        );

      case "menu":
        return <div style={itemStyle}>menu</div>;
      default:
        return (
          <div style={itemStyle}>
            <div>
              <span className="mx-auto">{text}</span>
            </div>
          </div>
        );
    }
  }
};

export default Field;
