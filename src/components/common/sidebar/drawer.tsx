import React from 'react';
import { IconButton, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, Input, Drawer, Card } from '@material-tailwind/react';
import { ChevronRightIcon, ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from './constants';
import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import SidebarLogin from './login';
import { useLoginDialog } from '@/contexts/login.dialog';

export function DrawerSidebar() {
    const [open, setOpen] = React.useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const { isOpen } = useLoginDialog();

    const handleOpen = (value: React.SetStateAction<number>) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <IconButton variant='text' size='lg' onClick={openDrawer} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {isDrawerOpen ? <XMarkIcon className='h-8 w-8 stroke-2' /> : <Bars3Icon className='h-8 w-8 stroke-2' />}
            </IconButton>
            <Drawer hidden={isOpen} className='z-[9995]' open={isDrawerOpen} onClose={closeDrawer} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Card color='transparent' shadow={false} className='h-[calc(100vh-2rem)] w-full p-4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className='mb-2 flex items-center gap-4 p-4'>
                        <img className='w-[80%]' src={logo} />
                    </div>
                    <div className='p-2'>
                        <Input icon={<MagnifyingGlassIcon className='h-5 w-5' />} label='Search' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    </div>
                    <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {SIDEBAR_ITEMS.map((item) => {
                            return (
                                <>
                                    {item.submenu && item.submenuItems?.length ? (
                                        <Accordion
                                            open={open === 1}
                                            icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`} />}
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        >
                                            <NavLink to={item.path}>
                                                <ListItem className='p-0' selected={open === 1} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <AccordionHeader
                                                        onClick={() => handleOpen(1)}
                                                        className='border-b-0 p-3'
                                                        placeholder={undefined}
                                                        onPointerEnterCapture={undefined}
                                                        onPointerLeaveCapture={undefined}
                                                    >
                                                        <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                            {item.icon}
                                                        </ListItemPrefix>
                                                        <Typography
                                                            color='blue-gray'
                                                            className='mr-auto font-normal'
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
                                                    {item.submenuItems.map((subItem) => (
                                                        <NavLink to={subItem.path}>
                                                            <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                                                                </ListItemPrefix>
                                                                {subItem.title}
                                                                <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    {subItem.beta && (
                                                                        <div>
                                                                            <Chip value='beta' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                                                        </div>
                                                                    )}
                                                                    {subItem.new && (
                                                                        <div>
                                                                            <Chip value='new' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                                                        </div>
                                                                    )}
                                                                    {subItem.soon && (
                                                                        <div>
                                                                            <Chip value='soon' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                                                        </div>
                                                                    )}
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        </NavLink>
                                                    ))}
                                                </List>
                                            </AccordionBody>
                                        </Accordion>
                                    ) : (
                                        <>
                                            <NavLink to={item.path}>
                                                <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        {item.icon}
                                                    </ListItemPrefix>
                                                    {item.title}
                                                </ListItem>
                                            </NavLink>
                                        </>
                                    )}
                                </>
                            );
                        })}
                    </List>
                </Card>
                <SidebarLogin />
            </Drawer>
        </>
    );
}
