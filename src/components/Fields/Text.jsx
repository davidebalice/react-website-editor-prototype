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
      <div
        onClick={() => handleEditing()}
        style={itemStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {isEditing && (
        <>
          <div className="textEditorOverlay">
            <div className="textEditor">
              <ReactQuill
                value={text}
                onChange={handleChange}
                theme="snow"
                placeholder=""
                onKeyPress={handleKeyPress}
                className="quillEditor"
              />
              <button onClick={handleSave} className="flex textSave">
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

export default Text;
