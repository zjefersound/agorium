import {
  MdOutlineHome,
  MdOutlineLibraryBooks,
  MdOutlineLocalOffer,
  MdOutlineMilitaryTech,
} from "react-icons/md";

export const NAVIGATION_ITEMS = [
  {
    path: "/",
    Icon: MdOutlineHome,
    label: "Home",
  },
  {
    path: "/tags",
    Icon: MdOutlineLocalOffer,
    label: "Tags",
  },
  {
    path: "/categories",
    Icon: MdOutlineLibraryBooks,
    label: "Categories",
  },
  {
    path: "/rankings",
    Icon: MdOutlineMilitaryTech,
    label: "Rankings",
  },
];
