import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";
import pages from "../../data/pages.js";
import PageModal from "../PageModal.jsx";


const Menu = ({ view }) => {
  const [modal, setModal] = useState(false);

  const handlePage = () => {
    setModal(true);
  };

  return (
    <>
      <PageModal modal={modal} setModal={setModal} />
      <div>
        <ul className="mainMenu" style={{gap: view === "tablet" ? "30px" : "50px"}}>
          {pages.map((page) => {
            return <li onClick={() => handlePage()}>{page.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Menu;
