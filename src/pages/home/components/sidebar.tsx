import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import { Label } from '@/components/ui/label';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { LiaToolsSolid } from "react-icons/lia";
import { SlLogin, SlLogout, SlSettings } from "react-icons/sl";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLoginDialog } from '@/contexts/login.dialog';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar(props: SidebarProps) {
    const { isLogged, user } = useAuth();
    const { Logout } = useAuth();
    const { openDialog } = useLoginDialog();

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
                <div className='absolute flex bottom-0 w-[100%] p-4 items-center justify-center'>
                    {isLogged ?
                        <div className='flex flex-row gap-5 justify-between items-center w-[100%]'>
                            <div onClick={() => { }} className='flex flex-row items-center gap-4 cursor-pointer'>
                                <Avatar className='rounded-[5px] p-0.5 outline-core-secondary outline outline-[1.3px]'>
                                    <AvatarImage className='rounded' src={user?.profileIcon || ''} />
                                    <AvatarFallback>DP</AvatarFallback>
                                </Avatar>
                                <Label className='text-black text-md cursor-pointer select-none'>
                                    {user?.nickname}
                                </Label>
                            </div>
                            <Button onClick={Logout} className='p-2 bg-slate-50 text-black hover:text-slate-500 hover:bg-slate-50'>
                                <SlLogout />
                            </Button>
                        </div>
                        :
                        <Button onClick={openDialog} className='bg-slate-50 gap-3 hover:bg-slate-50 hover fill-black text-black hover:text-slate-500 hover:fill-slate-500'>
                            <SlLogin />
                            <Label className='font-normal cursor-pointer'>Login</Label>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}