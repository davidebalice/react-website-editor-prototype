import React, { useState } from "react";
import { IoMdSave } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Image = ({
  view,
  handleMouseEnter,
  handleMouseLeave,
  content,
  field,
  style,
  itemStyle,
  isHovered,
  handleKeyPress,
  setFields,
  editor,
  setDragMode,
}) => {
  const fileRepositoryUrl = process.env.REACT_APP_FILE_REPOSITORY;
  const [text, setText] = useState((content.text && content.text.value) ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    setDragMode("Sections");

    setFields((prevFields) => {
      return prevFields.map((f) => {
        if (field._id === f._id) {
          return {
            ...f,
            text: {
              value: text,
            },
          };
        }
        return f;
      });
    });
  };

  const handleEditing = () => {
    if (editor) {
      setIsEditing(true);
      setDragMode("none");
    } else {
      setIsEditing(false);
      setDragMode("Sections");
    }
  };

  const textOverImgStyle = {
    position: "absolute",
    zIndex: 10,
    color: style?.text?.color || "#ffffff",
    textAlign: style?.text?.align?.trim() ? style.text.align : "left",
    fontSize:
      view === "mobile" || view === "tablet"
        ? style?.text?.mobileFontSize || "12px"
        : style?.text?.fontSize || "14px",
    ...(style?.text?.paddingSelect !== "select" && {
      padding:
        view === "mobile" || view === "tablet"
          ? style?.text?.mobilePadding || "5px"
          : style?.text?.padding || "0px",
    }),
    ...(style?.text?.paddingSelect === "select" && {
      paddingLeft:
        view === "mobile" || view === "tablet"
          ? style?.text?.mobilePaddingLeft || "5px"
          : style?.text?.paddingLeft || "0px",
      paddingRight:
        view === "mobile" || view === "tablet"
          ? style?.text?.mobilePaddingRight || "5px"
          : style?.text?.paddingRight || "0px",
      paddingTop:
        view === "mobile" || view === "tablet"
          ? style?.text?.mobilePaddingTop || "5px"
          : style?.text?.paddingTop || "0px",
      paddingBottom:
        view === "mobile" || view === "tablet"
          ? style?.text?.mobilePaddingBottom || "5px"
          : style?.text?.paddingBottom || "0px",
    }),
  };

  return (
    <div
      style={itemStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <>
        {content.text && content.text.value && (
          <>
            {!isEditing ? (
              <div
                onClick={() => handleEditing()}
                style={textOverImgStyle}
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
                <button onClick={handleSave} className="flex textSave">
                  <IoMdSave style={{ fontSize: "16px" }} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </>
        )}

        <img
          src={`${fileRepositoryUrl}${field.value}`}
          alt={field.name}
          style={{
            height: "auto",
            opacity: isHovered ? 0.8 : 1,
            width: "100%",
          }}
        />
      </>
    </div>
  );
};

export default Image;
