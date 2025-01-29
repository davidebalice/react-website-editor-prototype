import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const Image = ({
  text,
  view,
  handleMouseEnter,
  handleMouseLeave,
  field,
  style,
  itemStyle,
  isHovered,
  handleTextEditing,
}) => {
  const fileRepositoryUrl = process.env.REACT_APP_FILE_REPOSITORY;


  const textOverImgStyle = {
    position: "absolute",
    zIndex: 10,
    color: style?.text?.color || "#ffffff",
    width: style?.text?.width || "auto",
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
        {text && (
          <>
            <div
              onClick={() => handleTextEditing()}
              style={textOverImgStyle}
              dangerouslySetInnerHTML={{ __html: text }}
            />
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
