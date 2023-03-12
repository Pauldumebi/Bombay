import { FaChess, FaUsers } from "react-icons/fa";
import { NavItem } from "types/nav-item";

export const defaultNavItems: NavItem[] = [
    {
        label: "Users",
        path: "/",
        icon: <FaUsers size={25} />,
    },
    {
        label: "Games",
        path: "/games",
        icon: <FaChess size={25} />,
    },
];
