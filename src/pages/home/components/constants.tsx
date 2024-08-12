/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoHome } from "react-icons/go";
import { LiaToolsSolid } from "react-icons/lia";
import { SlSettings } from "react-icons/sl";
import { IoChevronDown } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { MdCalendarMonth, MdOutlineArticle } from "react-icons/md";
import React, { ReactElement } from "react";

export interface SubMenuProps {
    title: string;
    path: string;
    beta?: boolean;
    new?: boolean;
    soon?: boolean;
    description: string;
    icon: ReactElement<any, any>;
}

export interface SidebarItems {
    title: string;
    path: string;
    icon: React.ReactNode,
    separated?: boolean;
    submenu?: boolean;
    submenuItems?: SubMenuProps[];
    chevron?: React.ReactNode
}

export const SIDEBAR_ITEMS: SidebarItems[] = [
    {
        title: 'Home',
        path: '/',
        icon: <GoHome size={20} />
    },
    {
        title: 'Tools',
        path: '/tools',
        icon: <LiaToolsSolid size={20} />,
        submenu: true,
        chevron: <IoChevronDown size={20} />,
        submenuItems: [
            {
                title: 'Uuid Generator',
                new: true,
                path: '/tools/uuid',
                description: "Generates a random uuid v4",
                icon: <FaCode />
            },
            {
                title: 'Datetime',
                path: '/tools/datetime',
                description: "Datetime Generator",
                new: true,
                icon: <MdCalendarMonth />
            },
            {
                title: 'Markdown',
                path: '/tools/markdown',
                description: "Markdown editor",
                soon: true,
                icon: <AiOutlineFileMarkdown />
            },
        ]
    },
    {
        title: 'Articles',
        path: '/articles',
        icon: <MdOutlineArticle size={20} />
    },
    {
        title: 'Settings',
        path: '/settings',
        separated: true,
        icon: <SlSettings size={20} />
    }
];