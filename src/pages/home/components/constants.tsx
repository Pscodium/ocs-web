import { GoHome } from "react-icons/go";
import { LiaToolsSolid } from "react-icons/lia";
import { SlSettings } from "react-icons/sl";
import { IoChevronDown } from "react-icons/io5";
import React from "react";

export interface SubMenuProps {
    title: string;
    path: string;
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
                title: 'Markdown',
                path: '/tools/markdown'
            },
            {
                title: 'Uuid Generator',
                path: '/tools/uuid'
            }
        ]
    },
    {
        title: 'Settings',
        path: '/settings',
        separated: true,
        icon: <SlSettings size={20} />
    }
];