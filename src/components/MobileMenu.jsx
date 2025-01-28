import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import pages from "../data/pages.js";
import PageModal from "./PageModal.jsx";

const MobileMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState(false);

  const hangleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handlePage = () => {
    setModal(true);
  };

  return (
    <>
      <PageModal modal={modal} setModal={setModal} />
      <div className="headerMobile">
        <div className="iconMobile" onClick={() => hangleToggleMenu()}>
          {openMenu ? (
            <IoClose style={{ fontSize: "28px", fontWeight: "bold" }} />
          ) : (
            <GiHamburgerMenu style={{ fontSize: "24px" }} />
          )}
        </div>
      </div>
      <div className={`mainMenuMobile ${openMenu && "open"}`}>
        <ul className="mainMenuMobileButtons">
          {pages.map((page) => {
            return <li onClick={() => handlePage()}>{page.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
