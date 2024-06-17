/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoChevronDown } from "react-icons/io5";
import React, { ReactElement } from "react";
import { CodeBracketSquareIcon, CalendarIcon, BookmarkIcon, AdjustmentsHorizontalIcon, WrenchScrewdriverIcon, InboxIcon } from '@heroicons/react/24/solid';

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
        icon: <InboxIcon className="h-5 w-5" />
    },
    {
        title: 'Tools',
        path: '/tools',
        icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
        submenu: true,
        chevron: <IoChevronDown size={20} />,
        submenuItems: [
            {
                title: 'Uuid Generator',
                new: true,
                path: '/tools/uuid',
                description: "Generates a random uuid v4",
                icon: <CodeBracketSquareIcon className="h-5 w-5" />
            },
            {
                title: 'Datetime',
                path: '/tools/datetime',
                description: "Datetime Generator",
                new: true,
                icon: <CalendarIcon className="h-5 w-5" />
            },
            {
                title: 'Markdown',
                path: '/tools/markdown',
                description: "Markdown editor",
                soon: true,
                icon: <BookmarkIcon className="h-5 w-5" />
            },
        ]
    },
    {
        title: 'Settings',
        path: '/settings',
        separated: true,
        icon: <AdjustmentsHorizontalIcon className="h-5 w-5" />
    }
];