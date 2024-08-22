import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { SIDEBAR_ITEMS } from './constants';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import SidebarLogin from './login';
import { useAuth } from '@/contexts/auth';

export function Default() {
    const [open, setOpen] = React.useState(0);
    const { user } = useAuth();

    const handleOpen = (value: React.SetStateAction<number>) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card
            className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-auto z-[2]'
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        >
            <div className='mb-2 p-4'>
                <img className='w-[80%]' src={logo} />
            </div>
            <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {SIDEBAR_ITEMS.map((item, index) => {
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
                                                <Typography color='blue-gray' className='mr-auto font-normal' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    {item.title}
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                    </NavLink>
                                    <AccordionBody className='py-1'>
                                        <List className='p-0' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {item.submenuItems.map((subItem, subIndex) => (
                                                <NavLink to={subItem.path} key={subIndex}>
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
                                    <NavLink className={item.admin? user?.role != 'owner'? 'hidden':'visible': 'visible'} to={item.path} key={index}>
                                        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                {item.icon}
                                            </ListItemPrefix>
                                            {item.title}
                                            {/* <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <Chip value='14' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
                                            </ListItemSuffix> */}
                                        </ListItem>
                                    </NavLink>
                                </>
                            )}
                        </>
                    );
                })}
            </List>
            <SidebarLogin />
        </Card>
    );
}
