import React from "react";
import { MdColorLens } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { GiResize } from "react-icons/gi";
import { TbBoxMargin } from "react-icons/tb";
import { TbBoxPadding } from "react-icons/tb";
import { RxBorderAll } from "react-icons/rx";
import { AiOutlineRadiusUpleft } from "react-icons/ai";
import { RiShadowLine } from "react-icons/ri";
import { FaIcons } from "react-icons/fa";

const sidebarSections = [
  {
    type: "background",
    implemented: true,
    icon: <MdColorLens style={{ fontSize: "24px" }} />,
  },
  {
    type: "icon",
    implemented: false,
    icon: <FaIcons style={{ fontSize: "18px" }} />,
  },
  {
    type: "size",
    implemented: true,
    icon: <GiResize style={{ fontSize: "19px" }} />,
  },
  {
    type: "padding",
    implemented: true,
    icon: <TbBoxPadding style={{ fontSize: "24px" }} />,
  },
  {
    type: "margin",
    implemented: true,
    icon: <TbBoxMargin style={{ fontSize: "24px" }} />,
  },
  {
    type: "font",
    implemented: true,
    icon: <RxText style={{ fontSize: "23px" }} />,
  },
  {
    type: "border",
    implemented: true,
    icon: <RxBorderAll style={{ fontSize: "19px" }} />,
  },
  {
    type: "radius",
    implemented: true,
    icon: <AiOutlineRadiusUpleft style={{ fontSize: "23px" }} />,
  },
  {
    type: "shadow",
    implemented: false,
    icon: <RiShadowLine style={{ fontSize: "23px" }} />,
  },
];

export default sidebarSections;
