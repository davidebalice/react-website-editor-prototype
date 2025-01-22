import React, { useEffect, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import newContents from "../data/newContents";
import "../styles.css";

export default function NewContent({ newContentData, handleAddContent }) {
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPressed(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [pressed]);

  return (
    <>
      <div className="title1">
        <div className="flex" style={{ gap: "14px" }}>
          <FaSquarePlus style={{ fontSize: "24px" }} />
          <span>New content</span>
        </div>
      </div>
      <div className="newButtonDescription">
        Add new content
        <br />
        to selected Column
      </div>

      {newContents.map((item) => {
        return item.implemented ? (
          <div
            onClick={() => {
              pressed !== item.title &&
                handleAddContent(newContentData.columnId, 0, item.title);
              setPressed(item.title);
            }}
            className="flex newButton"
          >
            <div className="flex newIcon">{item.icon}</div>
            {pressed === item.title ? (
              <span style={{ color: "green" }}>Added!</span>
            ) : (
              <>
                <>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</>
              </>
            )}
          </div>
        ) : (
          <div
            onClick={() => {
              pressed !== item.title && setPressed(item.title);
            }}
            className="flex newButton disabled"
          >
            <div className="flex newIcon">{item.icon}</div>
            {pressed === item.title ? (
              <span style={{ color: "red" }}>
                <span style={{ fontSize: "11px" }}>Not yet implemented</span>
              </span>
            ) : (
              <>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</>
            )}
          </div>
        );
      })}

    
    </>
  );
}
