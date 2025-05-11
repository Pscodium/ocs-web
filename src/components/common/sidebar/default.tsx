import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { SIDEBAR_ITEMS } from './constants';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import SidebarLogin from './login';
import { useAuth } from '@/contexts/auth';
import { motion } from 'framer-motion';

export function Default() {
    const [open, setOpen] = React.useState(0);
    const { user } = useAuth();
    const location = useLocation();

    const handleOpen = (value: React.SetStateAction<number>) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card
            className='h-screen w-[320px] rounded-none shadow-xl shadow-blue-gray-900/5 bg-white'
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        >
            <div className='h-full flex flex-col cursor-pointer'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='p-4 py-6'
                    onClick={() => window.location.href = '/'}
                >
                    <img className='w-[80%] mx-auto transition-transform hover:scale-105 duration-300' src={logo} />
                </motion.div>
                <div className='flex-1 overflow-y-auto px-4'>
                    <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {SIDEBAR_ITEMS.map((item, index) => {
                            const isActive = location.pathname === item.path ||
                                (item.submenuItems && item.submenuItems.some(subItem => location.pathname === subItem.path));

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.submenu && item.submenuItems?.length ? (
                                        <Accordion
                                            open={open === 1}
                                            icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`} />}
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        >
                                            <NavLink to={item.path}>
                                                <ListItem
                                                    className={`p-0 ${isActive ? 'bg-core-light/70' : 'hover:bg-core-light/50'} transition-colors`}
                                                    selected={open === 1}
                                                    placeholder={undefined}
                                                    onPointerEnterCapture={undefined}
                                                    onPointerLeaveCapture={undefined}
                                                >
                                                    <AccordionHeader
                                                        onClick={() => handleOpen(1)}
                                                        className='border-b-0 p-3'
                                                        placeholder={undefined}
                                                        onPointerEnterCapture={undefined}
                                                        onPointerLeaveCapture={undefined}
                                                    >
                                                        <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                            <div className={`p-2 rounded-lg ${isActive ? 'bg-core-primary' : 'bg-core-primary/10'}`}>
                                                                {React.cloneElement(item.icon as React.ReactElement, {
                                                                    className: `h-5 w-5 ${isActive ? 'text-white' : 'text-core-primary'}`
                                                                })}
                                                            </div>
                                                        </ListItemPrefix>
                                                        <Typography
                                                            color='blue-gray'
                                                            className={`mr-auto font-medium ${isActive ? 'text-core-primary' : ''}`}
                                                            placeholder={undefined}
                                                            onPointerEnterCapture={undefined}
                                                            onPointerLeaveCapture={undefined}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                    </AccordionHeader>
                                                </ListItem>
                                            </NavLink>
                                            <AccordionBody className='py-1'>
                                                <List className='p-0' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    {item.submenuItems.map((subItem, subIndex) => (
                                                        <NavLink to={subItem.path} key={subIndex}>
                                                            <ListItem
                                                                className={`${location.pathname === subItem.path ? 'bg-core-light/70' : 'hover:bg-core-light/30'} transition-colors`}
                                                                placeholder={undefined}
                                                                onPointerEnterCapture={undefined}
                                                                onPointerLeaveCapture={undefined}
                                                            >
                                                                <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    <ChevronRightIcon strokeWidth={3} className='h-3 w-5 text-core-primary' />
                                                                </ListItemPrefix>
                                                                {subItem.title}
                                                                <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    {subItem.beta && (
                                                                        <Chip value='beta' size='sm' variant='ghost' color='blue' className='rounded-full' />
                                                                    )}
                                                                    {subItem.new && (
                                                                        <Chip value='new' size='sm' variant='ghost' color='green' className='rounded-full' />
                                                                    )}
                                                                    {subItem.soon && (
                                                                        <Chip value='soon' size='sm' variant='ghost' color='amber' className='rounded-full' />
                                                                    )}
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </NavLink>
                                                    ))}
                                                </List>
                                            </AccordionBody>
                                        </Accordion>
                                    ) : (
                                        <NavLink
                                            className={item.admin ? user?.role != 'owner' ? 'hidden' : 'visible' : 'visible'}
                                            to={item.path}
                                            key={index}
                                        >
                                            <ListItem
                                                className={`${location.pathname === item.path ? 'bg-core-light/70' : 'hover:bg-core-light/50'} transition-all duration-200`}
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                            >
                                                <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <div className={`p-2 rounded-lg ${location.pathname === item.path ? 'bg-core-primary' : 'bg-core-primary/10'}`}>
                                                        {React.cloneElement(item.icon as React.ReactElement, {
                                                            className: `h-5 w-5 ${location.pathname === item.path ? 'text-white' : 'text-core-primary'}`
                                                        })}
                                                    </div>
                                                </ListItemPrefix>
                                                <Typography
                                                    className={`font-medium ${location.pathname === item.path ? 'text-core-primary' : ''}`}
                                                    placeholder={undefined}
                                                    onPointerEnterCapture={undefined}
                                                    onPointerLeaveCapture={undefined}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                    )}
                                </motion.div>
                            );
                        })}
                    </List>
                </div>
                <div className='mt-auto'>
                    <SidebarLogin />
                </div>
            </div>
        </Card>
    );
}