import React, { useEffect, useState } from "react";
import { AiOutlineRadiusUpleft } from "react-icons/ai";
import { FaGear, FaSquarePlus } from "react-icons/fa6";
import { GiHamburgerMenu, GiResize } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdColorLens } from "react-icons/md";
import { RiShadowLine } from "react-icons/ri";
import { RxBorderAll, RxText } from "react-icons/rx";
import { TbBoxMargin, TbBoxPadding } from "react-icons/tb";
import sidebarSections from "../data/sidebarSections";
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
  setSelectedContainer,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("background");
  const [viewId, setViewId] = useState(false);

  useEffect(() => {
    setActiveSection("background");
    setIsOpen(false);
  }, [id]);

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

  const handleTextAlignChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      textAlign: e.target.value,
    });
  };

  const handlePositionChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      position: e.target.value,
    });
  };

  const handleBorderColorChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      borderColor: e.target.value,
    });
  };

  const handleBorderTypeChange = (e) => {
    setCurrentStyle({
      ...currentStyle,
      borderType: e.target.value,
    });
  };

  const handleBorderSelect = (e) => {
    setCurrentStyle({
      ...currentStyle,
      borderSelect: e.target.value,
    });
  };

  const handleBorderRadiusSelect = (e) => {
    setCurrentStyle({
      ...currentStyle,
      radiusSelect: e.target.value,
    });
  };

  const handlePaddingSelect = (e) => {
    setCurrentStyle({
      ...currentStyle,
      paddingSelect: e.target.value,
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
            id={id}
            newContentData={newContentData}
            handleAddContent={handleAddContent}
            setSelectedContainer={setSelectedContainer}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
            setSidebar={setSidebar}
          />
        </>
      ) : (
        <>
          <div className="title1" onClick={() => setViewId(!viewId)}>
            <div className="flex" style={{ gap: "14px" }}>
              <FaGear style={{ fontSize: "23px" }} />
              <span> {type || "Options"}</span>
            </div>
          </div>
          <div
            className="sidebarId"
            style={{ display: viewId ? "block" : "none" }}
          >
            <b>id:</b> {id}
          </div>

          {type === "Column" && (
            <div
              className="flex newColumnButton"
              style={{ gap: "14px" }}
              onClick={() => handleAddContent(id, 1, "")}
            >
              <FaSquarePlus style={{ fontSize: "20px" }} />
              <span>New content</span>
            </div>
          )}

          <div className="flex sidebarMenu" onClick={() => setIsOpen(!isOpen)}>
            <div>
              <GiHamburgerMenu style={{ fontSize: "18px" }} />
            </div>
            select options
          </div>

          <div className={`sidebarMenuOpened ${isOpen ? "open" : ""}`}>
            {sidebarSections
              .filter((item) => {
                if (item.type === "margin" && type === "Site options")
                  return false;
                if (item.type === "font" && type !== "Text") return false;
                return true;
              })
              .map((item) => (
                <div
                  onClick={() => {
                    setActiveSection(item.type);
                    setIsOpen(false);
                  }}
                  className="flex sidebarMenuItem"
                  key={item.type}
                >
                  <div className="sidebarMenuIcon">{item.icon}</div>
                  <span>
                    {" "}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
              ))}
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
                  <GiResize style={{ fontSize: "19px" }} />
                </div>
                <span>Size</span>
              </div>
              <p>Width</p>
              <input
                type="range"
                min="10"
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

              <br />
              <p>Text align</p>
              <select
                className="sidebarSelect"
                onChange={handleTextAlignChange}
                value={currentStyle.textAlign || "center"}
              >
                <option value=""> ------- </option>
                <option value="center">Center</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}

          {activeSection === "border" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <RxBorderAll style={{ fontSize: "19px" }} />
                </div>
                <span>Border</span>
              </div>

              <p>Border color</p>
              <input
                type="color"
                id="textColor"
                className="sidebarColorSelector"
                value={currentStyle?.borderColor}
                onChange={handleBorderColorChange}
              />
              <div className="bottomCode">{currentStyle?.borderColor}</div>

              <p>Border type</p>
              <select
                className="sidebarSelect"
                onChange={handleBorderTypeChange}
                value={currentStyle.borderType || ""}
              >
                <option value=""> ------- </option>
                <option value="solid">solid</option>
                <option value="dotted">dotted</option>
                <option value="dashed">dashed</option>
              </select>

              <p>Select all borders / select borders</p>
              <select
                className="sidebarSelect"
                onChange={handleBorderSelect}
                value={currentStyle.borderSelect || ""}
              >
                <option value="all">All borders</option>
                <option value="select">Select borders</option>
              </select>

              {currentStyle.borderSelect !== "select" && (
                <>
                  <p>Border size</p>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={parseInt(currentStyle.borderSize || 0)}
                    className="sidebarSlider"
                    onChange={(e) =>
                      setCurrentStyle({
                        ...currentStyle,
                        borderSize: e.target.value + "px",
                      })
                    }
                  />
                  <br />
                  <div className="bottomCode">
                    {currentStyle?.borderSize || "0px"}
                  </div>
                </>
              )}

              {currentStyle.borderSelect === "select" &&
                ["Top", "Left", "Right", "Bottom"].map((direction) => (
                  <div key={direction}>
                    <p>Border {direction} size</p>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="1"
                      value={parseInt(currentStyle[`border${direction}`] || 0)}
                      className="sidebarSlider"
                      onChange={(e) =>
                        setCurrentStyle({
                          ...currentStyle,
                          [`border${direction}`]: e.target.value + "px",
                        })
                      }
                    />
                    <div className="bottomCode">
                      {currentStyle[`border${direction}`] || "0px"}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeSection === "radius" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <AiOutlineRadiusUpleft style={{ fontSize: "23px" }} />
                </div>
                <span>Border radius</span>
              </div>

              <p>Select all angles / select angles</p>
              <select
                className="sidebarSelect"
                onChange={handleBorderRadiusSelect}
                value={currentStyle.radiusSelect || ""}
              >
                <option value="all">All angles</option>
                <option value="select">Select angles</option>
              </select>

              {currentStyle.radiusSelect !== "select" && (
                <>
                  <p>Radius</p>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={parseInt(currentStyle.borderRadius || 0)}
                    className="sidebarSlider"
                    onChange={(e) =>
                      setCurrentStyle({
                        ...currentStyle,
                        borderRadius: e.target.value + "px",
                      })
                    }
                  />
                  <br />
                  <div className="bottomCode">
                    {currentStyle?.borderRadius || "0px"}
                  </div>
                </>
              )}

              {currentStyle.radiusSelect === "select" &&
                ["TopLeft", "TopRight", "BottomLeft", "BottomRight"].map(
                  (angle) => (
                    <div key={angle}>
                      <p>Radius {angle}</p>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={parseInt(
                          currentStyle[`border${angle}Radius`] || 0
                        )}
                        className="sidebarSlider"
                        onChange={(e) =>
                          setCurrentStyle({
                            ...currentStyle,
                            [`border${angle}Radius`]: e.target.value + "px",
                          })
                        }
                      />
                      <div className="bottomCode">
                        {currentStyle[`border${angle}Radius`] || "0px"}
                      </div>
                    </div>
                  )
                )}
            </div>
          )}

          {activeSection === "padding" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <TbBoxPadding style={{ fontSize: "24px" }} />
                </div>
                <span>Padding</span>
              </div>

              <p>Select all edges / select edges</p>
              <select
                className="sidebarSelect"
                onChange={handlePaddingSelect}
                value={currentStyle.paddingSelect || ""}
              >
                <option value="all">All edges</option>
                <option value="select">Select edges</option>
              </select>

              {currentStyle.paddingSelect !== "select" && (
                <>
                  <p>Padding</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={parseInt(currentStyle.padding || 0)}
                    className="sidebarSlider"
                    onChange={(e) =>
                      setCurrentStyle({
                        ...currentStyle,
                        padding: e.target.value + "px",
                      })
                    }
                  />
                  <br />
                  <div className="bottomCode">
                    {currentStyle?.padding || "0px"}
                  </div>
                </>
              )}

              {currentStyle.paddingSelect === "select" &&
                ["Top", "Bottom", "Left", "Right"].map((edge) => (
                  <div key={edge}>
                    <p>Padding {edge}</p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={parseInt(currentStyle[`padding${edge}`] || 0)}
                      className="sidebarSlider"
                      onChange={(e) =>
                        setCurrentStyle({
                          ...currentStyle,
                          [`padding${edge}`]: e.target.value + "px",
                        })
                      }
                    />
                    <div className="bottomCode">
                      {currentStyle[`padding${edge}`] || "0px"}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeSection === "margin" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <TbBoxMargin style={{ fontSize: "24px" }} />
                </div>
                <span>Margin</span>
              </div>
              {["Top", "Bottom"].map((edge) => (
                <div key={edge}>
                  <p>Margin {edge}</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={parseInt(currentStyle[`margin${edge}`] || 0)}
                    className="sidebarSlider"
                    onChange={(e) =>
                      setCurrentStyle({
                        ...currentStyle,
                        [`margin${edge}`]: e.target.value + "px",
                      })
                    }
                  />
                  <div className="bottomCode">
                    {currentStyle[`margin${edge}`] || "0px"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "shadow" && (
            <div className="sidebarMenuSection">
              <div className="flex sidebarMenuTitle">
                <div>
                  <RiShadowLine style={{ fontSize: "23px" }} />
                </div>
                <span>Shadow</span>
              </div>
              <p className="notImplemented">
                Shadow
                <br />
                not yet implemented
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
