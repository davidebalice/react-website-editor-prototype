import React from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Social = ({ content, text, itemStyle, handleEditing }) => {
  const stylesFacebook = {
    fontSize: "28px",
    color:
      content.style.socialColor === "original"
        ? "#0866ff"
        : content.style.socialColor,
  };
  const stylesX = {
    fontSize: "28px",
    color:
      content.style.socialColor === "original"
        ? "#111111"
        : content.style.socialColor,
  };
  const stylesInstagram = {
    fontSize: "28px",
    color:
      content.style.socialColor === "original"
        ? "#ee01ce"
        : content.style.socialColor,
  };
  const stylesLinkedin = {
    fontSize: "28px",
    color:
      content.style.socialColor === "original"
        ? "#2464ad"
        : content.style.socialColor,
  };

  return (
    <div className="social">
      <FaFacebookSquare style={stylesFacebook} />
      <FaSquareXTwitter style={stylesX} />
      <FaInstagramSquare style={stylesInstagram} />
      <FaLinkedin style={stylesLinkedin} />
    </div>
  );
};

export default Social;
