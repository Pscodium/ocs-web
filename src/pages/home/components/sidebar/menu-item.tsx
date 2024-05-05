import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItems } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';

export interface MenuItemAttributes {
    item: SidebarItems;
}

export default function MenuItem({ item }: MenuItemAttributes) {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
        <>
            <NavLink
                to={item.path}
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center justify-between p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'flex flex-row items-center justify-between p-3 w-[100%]'
                }
            >
                <div className='flex flex-row gap-2 items-center'>
                    {item.icon}
                    <Label className='text-[16px] font-normal cursor-pointer'>{item.title}</Label>
                </div>
                {item.submenu && item.chevron && (
                    <div className={`h-full w-[15%] items-center justify-center flex ${submenuOpen ? 'rotate-180' : ''}`}>
                        {item.chevron}
                    </div>
                )}
            </NavLink>
            <AnimatePresence>
                {item.submenu && item.submenuItems?.length && submenuOpen && (
                    <>
                        {
                            item.submenuItems.map((i, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className='flex flex-col pl-5 pt-3 gap-1'>
                                    <NavLink
                                        to={i.path}
                                        className={({ isActive }) =>
                                            isActive ? 'flex flex-row items-center justify-between p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'flex flex-row items-center justify-between p-3 w-[100%]'
                                        }
                                    >
                                        <div className='flex flex-row gap-2 items-center'>
                                            <Label className='text-[16px] font-normal cursor-pointer'>{i.title}</Label>
                                        </div>
                                    </NavLink>
                                </motion.div>
                            ))
                        }
                    </>
                )}
            </AnimatePresence>
        </>
    );
}