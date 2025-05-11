import React from 'react';
import { IconButton, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, Drawer, Card } from '@material-tailwind/react';
import { ChevronRightIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_ITEMS } from './constants';
import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import SidebarLogin from './login';
import { useAuth } from '@/contexts/auth';

export function DrawerSidebar() {
    const [open, setOpen] = React.useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const location = useLocation();
    const { user } = useAuth();

    const handleOpen = (value: React.SetStateAction<number>) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <IconButton
                variant='text'
                size='lg'
                onClick={openDrawer}
                className='fixed top-4 left-4 z-50'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {isDrawerOpen ? <XMarkIcon className='h-8 w-8 stroke-2' /> : <Bars3Icon className='h-8 w-8 stroke-2' />}
            </IconButton>
            <Drawer
                open={isDrawerOpen}
                onClose={closeDrawer}
                className='p-0'
                placement='left'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <Card
                    color='transparent'
                    shadow={false}
                    className='h-full w-full'
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <div className='h-full flex flex-col'>
                        <div className='p-4'>
                            <img className='w-[80%] mx-auto' src={logo} />
                        </div>

                        <div className='flex-1 overflow-y-auto px-4'>
                            <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {SIDEBAR_ITEMS.map((item, index) => {
                                    const isActive = location.pathname === item.path ||
                                        (item.submenuItems && item.submenuItems.some(subItem => location.pathname === subItem.path));

                                    return (
                                        <>
                                            {item.submenu && item.submenuItems?.length ? (
                                                <Accordion
                                                    open={open === 1}
                                                    icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`} />}
                                                    placeholder={undefined}
                                                    onPointerEnterCapture={undefined}
                                                    onPointerLeaveCapture={undefined}
                                                    key={index}
                                                >
                                                    <ListItem
                                                        className={`p-0 ${isActive ? 'bg-core-light/70' : ''}`}
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
                                                    <AccordionBody className='py-1'>
                                                        <List className='p-0' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                            {item.submenuItems.map((subItem, subIndex) => (
                                                                <NavLink to={subItem.path} key={subIndex} onClick={closeDrawer}>
                                                                    <ListItem
                                                                        className={`${location.pathname === subItem.path ? 'bg-core-light/70' : ''}`}
                                                                        placeholder={undefined}
                                                                        onPointerEnterCapture={undefined}
                                                                        onPointerLeaveCapture={undefined}
                                                                    >
                                                                        <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                            <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                                                                        </ListItemPrefix>
                                                                        {subItem.title}
                                                                        <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                            {subItem.beta && (
                                                                                <Chip value='beta' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                                                            )}
                                                                            {subItem.new && (
                                                                                <Chip value='new' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                                                            )}
                                                                            {subItem.soon && (
                                                                                <Chip value='soon' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
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
                                                    to={item.path}
                                                    key={index}
                                                    onClick={closeDrawer}
                                                    className={item.admin ? user?.role != 'owner' ? 'hidden' : 'visible' : 'visible'}
                                                >
                                                    <ListItem
                                                        className={`${location.pathname === item.path ? 'bg-core-light/70' : ''}`}
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
                                        </>
                                    );
                                })}
                            </List>
                        </div>
                        <div className='mt-auto'>
                            <SidebarLogin />
                        </div>
                    </div>
                </Card>
            </Drawer>
        </>
    );
}