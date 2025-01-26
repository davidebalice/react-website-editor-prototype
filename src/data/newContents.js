import { BsTable } from "react-icons/bs";
import { FaCode, FaMapMarkerAlt, FaVolumeUp, FaWpforms } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { MdFileDownload } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { TbSlideshow } from "react-icons/tb";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { TiSocialInstagram } from "react-icons/ti";
import { RxButton } from "react-icons/rx";

const newContest = [
  {
    title: "text",
    implemented: true,
    icon: <RxText />,
  },
  {
    title: "image",
    implemented: true,
    icon: <FaRegImage />,
  },
  {
    title: "divider",
    implemented: true,
    icon: <TfiLayoutLineSolid />,
  },
  {
    title: "button",
    implemented: false,
    icon: <RxButton />,
  },
  {
    title: "slideshow",
    implemented: false,
    icon: <TbSlideshow />,
  },
  {
    title: "form",
    implemented: false,
    icon: <FaWpforms />,
  },
  {
    title: "table",
    implemented: false,
    icon: <BsTable />,
  },
  {
    title: "file",
    implemented: false,
    icon: <MdFileDownload />,
  },
  {
    title: "video",
    implemented: false,
    icon: <GoVideo />,
  },
  {
    title: "audio",
    implemented: false,
    icon: <FaVolumeUp />,
  },
  {
    title: "code",
    implemented: false,
    icon: <FaCode />,
  },
  {
    title: "map",
    implemented: false,
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "social",
    implemented: false,
    icon: <TiSocialInstagram />,
  },
];

export default newContest;
