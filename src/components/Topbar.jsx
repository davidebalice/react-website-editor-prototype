import React from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import {
  FaDesktop,
  FaInfoCircle,
  FaMobileAlt,
  FaSearchMinus,
  FaSearchPlus,
} from "react-icons/fa";
import { FaGithub, FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { MdTabletAndroid } from "react-icons/md";
import logo from "../assets/img/logo.png";
import "../styles.css";
import { TbArrowAutofitContent } from "react-icons/tb";

export default function Topbar({
  view,
  setView,
  editor,
  setEditor,
  zoomLevel,
  zoomIn,
  zoomOut,
  setInfo,
  setSidebar
}) {
  return (
    <div className="flex topbar">
      <div className="flex">
        <img src={logo} className="logo" alt="davidebalice.dev logo" />
        <h1 className="topbarTitle">
          Website editor
          <br />
          <span>prototype</span>
        </h1>
      </div>

      <div className="flex topbarDevices">
        <div
          onClick={() => setView("desktop")}
          className="flexCenter topbarIcon"
          data-tooltip-id="tooltip-topbar"
          data-tooltip-content="Desktop"
        >
          <FaDesktop style={{ fontSize: "23px" }} />
        </div>
        <div
          onClick={() => {
            setView("mobile");
            setEditor(false);
          }}
          className="flexCenter topbarIcon"
          data-tooltip-id="tooltip-topbar"
          data-tooltip-content="Smartphone"
        >
          <FaMobileAlt style={{ fontSize: "23px" }} />
        </div>
        <div
          onClick={() => {
            setView("tablet");
            setEditor(false);
          }}
          className="flexCenter topbarIcon"
          data-tooltip-id="tooltip-topbar"
          data-tooltip-content="Tablet"
        >
          <MdTabletAndroid style={{ fontSize: "23px" }} />
        </div>
        <div
          onClick={() => {
            setView("full");
            setEditor(false);
            setSidebar(false);
          }}
          className="flexCenter topbarIcon"
          data-tooltip-id="tooltip-topbar"
          data-tooltip-content="100%"
        >
          <TbArrowAutofitContent style={{ fontSize: "28px" }} />
        </div>

        {editor && (
          <div
            onClick={() => {
              setEditor(false);
            }}
            className="flexCenter topbarIcon"
            data-tooltip-id="tooltip-topbar"
            data-tooltip-content="Editor Off"
          >
            <FaToggleOn style={{ fontSize: "28px", color: "green" }} />
          </div>
        )}

        {!editor && (
          <div
            onClick={() => {
              setEditor(true);
            }}
            className="flexCenter topbarIcon"
            data-tooltip-id="tooltip-topbar"
            data-tooltip-content="Editor On"
          >
            <FaToggleOff style={{ fontSize: "28px", color: "red" }} />
          </div>
        )}

        <div className="zoomContainer">
          <div className="flexCenter zoomButtons">
            <div
              onClick={zoomIn}
              className="flexCenter topbarIcon2"
              data-tooltip-id="tooltip-topbar"
              data-tooltip-content="Zoom in"
            >
              <FaSearchPlus style={{ fontSize: "20px" }} />
            </div>

            <div
              onClick={zoomOut}
              className="flexCenter topbarIcon2"
              data-tooltip-id="tooltip-topbar"
              data-tooltip-content="Zoom out"
            >
              <FaSearchMinus style={{ fontSize: "20px" }} />
            </div>

            <div style={{marginLeft:"6px"}}>{Math.round(zoomLevel * 100)}%</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
            <FaInfoCircle className="info" onClick={()=>{setInfo(true)}} />
          <a
            href="https://github.com/davidebalice/react-website-editor-prototype"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="github"/>
          </a>
        </div>
      </div>
    </div>
  );
}
