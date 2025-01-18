import React from "react";

const Devices = ({ view }) => {
  return (
    <>
      <div
        className="deviceWrapper mobileTop"
        style={{
          opacity: view === "mobile" ? "1" : "0",
          transition: view === "mobile" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper mobileLeft"
        style={{
          opacity: view === "mobile" ? "1" : "0",
          transition: view === "mobile" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper mobileRight"
        style={{
          opacity: view === "mobile" ? "1" : "0",
          transition: view === "mobile" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper mobileBottom"
        style={{
          opacity: view === "mobile" ? "1" : "0",
          transition: view === "mobile" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper tabletTop"
        style={{
          opacity: view === "tablet" ? "1" : "0",
          transition: view === "tablet" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>

      <div
        className="deviceWrapper tabletLeft"
        style={{
          opacity: view === "tablet" ? "1" : "0",
          transition: view === "tablet" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper tabletRight"
        style={{
          opacity: view === "tablet" ? "1" : "0",
          transition: view === "tablet" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
      <div
        className="deviceWrapper tabletBottom"
        style={{
          opacity: view === "tablet" ? "1" : "0",
          transition: view === "tablet" ? "all 0.3s ease-in-out 0.5s" : "none",
        }}
      ></div>
    </>
  );
};

export default Devices;
