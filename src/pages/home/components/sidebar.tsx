import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import { Label } from '@/components/ui/label';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { LiaToolsSolid } from "react-icons/lia";
import { SlSettings } from "react-icons/sl";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> { }

export default function Sidebar(props: SidebarProps) {
    return (
        <div className={props.className}>
            <div className='flex flex-col items-center w-[100vw]'>
                <div className='flex self-start py-6  w-[100%] items-center justify-center text-center'>
                    <img className='w-[80%]' src={logo} />
                </div>
                <ScrollArea className='flex flex-col w-full gap-3'>
                    <div className='flex flex-col gap-3 w-full'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'p-3 w-[100%]'
                            }
                        >
                            <div className='flex flex-row gap-2 items-center'>
                                <GoHome size={20} />
                                <Label className='text-[16px] font-normal cursor-pointer'>Home</Label>
                            </div>
                        </NavLink>
                        <NavLink
                            to='/tools'
                            className={({ isActive }) =>
                                isActive ? 'p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'p-3 w-[100%]'
                            }
                        >
                            <div className='flex flex-row gap-2 items-center'>
                                <LiaToolsSolid size={20} />
                                <Label className={'text-[16px] font-normal cursor-pointer'}>Tools</Label>
                            </div>
                        </NavLink>
                    </div>
                    <Separator />
                    <div className='flex flex-col gap-3 w-full'>
                        <NavLink
                            to='/settings'
                            className={({ isActive }) =>
                                isActive ? 'p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'p-3 w-[100%]'
                            }
                        >
                            <div className='flex flex-row gap-2 items-center'>
                                <SlSettings size={20} />
                                <Label className={'text-[16px] font-normal cursor-pointer'}>Settings</Label>
                            </div>
                        </NavLink>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}