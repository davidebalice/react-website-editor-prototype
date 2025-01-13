import React from "react";
import "../styles.css";

export default function Topbar({ view, setView }) {
  return (
    <div className="topbar">
      <div onClick={() => setView("desktop")}>desktop</div>
      <div onClick={() => setView("mobile")}>mobile</div>
    </div>
  );
}
