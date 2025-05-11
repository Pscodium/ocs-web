import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth';
import { useLoginDialog } from '@/contexts/login.dialog';
import { SlLogin, SlLogout } from 'react-icons/sl';

export interface SidebarLoginProps {}

export default function SidebarLogin() {
    const { user, Logout, isLogged } = useAuth();
    const { openDialog } = useLoginDialog();

    return (
        <div className='w-full p-4 border-t border-gray-200 bg-white'>
            {isLogged ?
                <div className='flex flex-row gap-5 justify-between items-center'>
                    <div onClick={() => { }} className='flex flex-row items-center gap-4 cursor-pointer flex-1 min-w-0'>
                        <Avatar className='rounded-[5px] p-0.5 outline-core-secondary outline outline-[1.3px] flex-shrink-0'>
                            <AvatarImage className='rounded' src={user?.profileIcon || ''} />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <Label className='text-black text-md cursor-pointer select-none truncate'>
                            {user?.nickname}
                        </Label>
                    </div>
                    <Button onClick={Logout} className='p-2 bg-white text-black hover:text-slate-500 hover:bg-white flex-shrink-0'>
                        <SlLogout />
                    </Button>
                </div>
                :
                <Button onClick={openDialog} className='w-full bg-white gap-3 hover:bg-white hover fill-black text-black hover:text-slate-500 hover:fill-slate-500'>
                    <SlLogin />
                    <Label className='font-normal cursor-pointer'>Login</Label>
                </Button>
            }
        </div>
    );
}