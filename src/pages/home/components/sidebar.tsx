import logo from '@/assets/k2ehu39u8e8lvejynnk.png';
import { Label } from '@/components/ui/label';
import React from 'react';
import { SlLogin, SlLogout } from "react-icons/sl";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLoginDialog } from '@/contexts/login.dialog';
import { SIDEBAR_ITEMS } from './constants';
import MenuItem from './sidebar/menu-item';
import { AnimatePresence, motion } from 'framer-motion';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> { }

export default function Sidebar(props: SidebarProps) {
    const { isLogged, user, Logout } = useAuth();
    const { openDialog } = useLoginDialog();

    return (
        <div className={props.className}>
            <div className='flex flex-col items-center w-[100vw]'>
                <div className='flex self-start py-6  w-[100%] items-center justify-center text-center'>
                    <img className='w-[80%]' src={logo} />
                </div>
                <ScrollArea className='flex flex-col w-full gap-3'>
                    <AnimatePresence>
                        {SIDEBAR_ITEMS.map((item, index) => {
                            return (
                                <motion.div
                                    layout="position"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    key={index}
                                >
                                    {!item.separated ?
                                        <motion.div
                                            layout="position"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='flex flex-col w-full'>
                                            <MenuItem key={index} item={item} />
                                        </motion.div>
                                        :
                                        <motion.div
                                            layout="position"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='flex flex-col w-full gap-3'>
                                            <Separator />
                                            <MenuItem key={index} item={item} />
                                        </motion.div>
                                    }
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
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
                            <Button onClick={Logout} className='p-2 bg-white text-black hover:text-slate-500 hover:bg-white'>
                                <SlLogout />
                            </Button>
                        </div>
                        :
                        <Button onClick={openDialog} className='bg-white gap-3 hover:bg-white hover fill-black text-black hover:text-slate-500 hover:fill-slate-500'>
                            <SlLogin />
                            <Label className='font-normal cursor-pointer'>Login</Label>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}