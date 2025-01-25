import React from "react";
import { IoMdSave } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Text = ({
  view,
  isEditing,
  text,
  handleMouseEnter,
  handleMouseLeave,
  content,
  field,
  style,
  itemStyle,
  isHovered,
  handleEditing,
  handleSave,
  handleKeyPress,
  handleChange,
}) => {
  return (
    <div>
      {!isEditing ? (
        <div
          onClick={() => handleEditing()}
          style={itemStyle}
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
    </div>
  );
};

export default Text;
