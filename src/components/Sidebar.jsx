import React, { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdColorLens } from "react-icons/md";
import { RxText } from "react-icons/rx";
import "../styles.css";
import NewContent from "./NewContent";

export default function Sidebar({
  id,
  type,
  currentStyle,
  setCurrentStyle,
  setEditor,
  editor,
  sidebar,
  setSidebar,
  newContentData,
  setNewContentData,
  handleAddContent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("background");

  const handleBackgroundChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      background: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      color: e.target.value,
    });
  };

  const handleFontChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      fontFamily: e.target.value,
    });
  };

  const handleAlignChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      align: e.target.value,
    });
  };

  const handlePositionChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      position: e.target.value,
    });
  };

  /*
  console.log("currentStyle::::::::::::::::::::::::::::::::");
  console.log(currentStyle);
  */

  return (
    <div className={`sidebar ${sidebar ? "" : "close"}`}>
      <div
        className="flexCenter sidebarClose"
        onClick={() => setSidebar(!sidebar)}
      >
        {sidebar ? (
          <>
            <IoIosArrowBack />
          </>
        ) : (
          <>
            {" "}
            <IoIosArrowForward />
          </>
        )}
      </div>

      {newContentData.selectContent ? (
        <>
          <NewContent
            newContentData={newContentData}
            handleAddContent={handleAddContent}
          />
        </>
      ) : (
        <>
          <div className="title1">
            <div className="flex" style={{ gap: "14px" }}>
              <FaGear style={{ fontSize: "23px" }} />
              <span> {type || "Options"}</span>
            </div>
          </div>

          {/*
<div className="sidebarId">
            <b>id:</b> {id}
          </div>
*/}

          <div className="flex sidebarMenu" onClick={() => setIsOpen(!isOpen)}>
            <div>
              <GiHamburgerMenu style={{ fontSize: "18px" }} />
            </div>
            select options
          </div>

          <div className={`sidebarMenuOpened ${isOpen ? "open" : ""}`}>
            <div
              onClick={() => {
                setActiveSection("background");
                setIsOpen(false);
              }}
              className="flex sidebarMenuItem"
            >
              <div>
                <MdColorLens style={{ fontSize: "24px" }} />
              </div>
              <span>Background</span>
            </div>

            <div
              onClick={() => {
                setActiveSection("size");
                setIsOpen(false);
              }}
              className="flex sidebarMenuItem"
            >
              <div>
                <MdColorLens style={{ fontSize: "24px" }} />
              </div>
              <span>Size</span>
            </div>

            <div
              onClick={() => {
                setActiveSection("font");
                setIsOpen(false);
              }}
              className="flex sidebarMenuItem"
            >
              <div>
                <RxText style={{ fontSize: "23px" }} />
              </div>
              <span>Font</span>
            </div>

            <div
              onClick={() => {
                setActiveSection("border");
                setIsOpen(false);
              }}
              className="flex sidebarMenuItem"
            >
              <div>
                <RxText style={{ fontSize: "23px" }} />
              </div>
              <span>Border</span>
            </div>
          </div>

          {activeSection === "background" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <MdColorLens style={{ fontSize: "24px" }} />
                </div>
                <span>Background</span>
              </div>
              <p>Select background color</p>
              <input
                type="color"
                id="backgroundColor"
                value={currentStyle?.background}
                className="sidebarColorSelector"
                onChange={handleBackgroundChange}
              />
              <div className="bottomCode">{currentStyle?.background}</div>
            </div>
          )}

          {activeSection === "size" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <MdColorLens style={{ fontSize: "24px" }} />
                </div>
                <span>Size</span>
              </div>
              <p>Width</p>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={parseInt(currentStyle.width || 100)}
                className="sidebarSlider"
                onChange={(e) =>
                  setCurrentStyle({
                    ...currentStyle,
                    width: e.target.value + "%",
                  })
                }
              />
              <br />
              <div className="bottomCode">{currentStyle?.width || "100%"}</div>

              <p>Position</p>
              <select
                className="sidebarSelect"
                onChange={handlePositionChange}
                value={currentStyle.position || "center"}
              >
                <option value=""> ------- </option>
                <option value="center">Center</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>

              <br />
              <p>Align</p>
              <select
                className="sidebarSelect"
                onChange={handleAlignChange}
                value={currentStyle.align || "center"}
              >
                <option value=""> ------- </option>
                <option value="center">Center</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}

          {activeSection === "font" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <RxText style={{ fontSize: "24px" }} />
                </div>
                <span>Font</span>
              </div>
              <p>Select text color</p>
              <input
                type="color"
                id="textColor"
                className="sidebarColorSelector"
                value={currentStyle?.color}
                onChange={handleColorChange}
              />
              <div className="bottomCode">{currentStyle?.color}</div>

              <p>Select font</p>

              <select
                className="sidebarSelect"
                onChange={handleFontChange}
                value={currentStyle.fontFamily || ""}
              >
                <option value=""> ------- </option>
                <option value="arial">Arial</option>
                <option value="courier">Courier New</option>
                <option value="lato">Lato</option>
                <option value="open-sans">Open Sans</option>
                <option value="poppins">Poppins</option>
                <option value="roboto">Roboto</option>
                <option value="times">Times New Roman</option>
                <option value="verdana">Verdana</option>
              </select>

              <p>Font size</p>
              <input
                type="range"
                min="8"
                max="60"
                step="1"
                value={parseInt(currentStyle.fontSize || 14)}
                className="sidebarSlider"
                onChange={(e) =>
                  setCurrentStyle({
                    ...currentStyle,
                    fontSize: e.target.value + "px",
                  })
                }
              />
              <br />
              <div className="bottomCode">
                {currentStyle?.fontSize || "14px"}
              </div>
            </div>
          )}

          {activeSection === "border" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <RxText style={{ fontSize: "24px" }} />
                </div>
                <span>Border</span>
              </div>
              <p>Border color</p>
              <input
                type="color"
                id="textColor"
                className="sidebarColorSelector"
                value={currentStyle?.color}
                onChange={handleColorChange}
              />
              <div className="bottomCode">{currentStyle?.color}</div>

              <p>Border type</p>

              <select
                className="sidebarSelect"
                onChange={handleFontChange}
                value={currentStyle.fontFamily || ""}
              >
                <option value=""> ------- </option>
                <option value="arial">Arial</option>
                <option value="courier">Courier New</option>
                <option value="lato">Lato</option>
                <option value="open-sans">Open Sans</option>
                <option value="poppins">Poppins</option>
                <option value="roboto">Roboto</option>
                <option value="times">Times New Roman</option>
                <option value="verdana">Verdana</option>
              </select>

              <p>Border size</p>
              <input
                type="range"
                min="8"
                max="60"
                step="1"
                value={parseInt(currentStyle.fontSize || 14)}
                className="sidebarSlider"
                onChange={(e) =>
                  setCurrentStyle({
                    ...currentStyle,
                    fontSize: e.target.value + "px",
                  })
                }
              />
              <br />
              <div className="bottomCode">
                {currentStyle?.fontSize || "14px"}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
