import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { useState } from 'react';
import useLogin from '@/hooks/auth/useLogin';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import LoginDialog from './components/login.dialog';

export interface LoginInputProps {
    email: string | undefined;
    password: string | undefined;
}

export default function Home() {
    const [loginDialog, setLoginDialog] = useState(false);
    const { toast } = useToast();
    const [loginInputs, setLoginInputs] = useState<LoginInputProps>({
        email: undefined,
        password: undefined,
    });
    const { mutate: loginMutation } = useLogin();
    const { Login, Logout } = useAuth();

    async function handleOpenLoginDialog() {
        setLoginDialog(!loginDialog);
    }

    async function login(email: string, password: string) {
        try {
            Login({
                email,
                password,
                mutate: loginMutation
            });
            toast({
                variant: "destructive",
                title: "Hell yeah! You are inside me",
                description: "You have successfully logged in you bastard fagot...",
                className: "outline-none border-none bg-green-600 text-slate-200",
            });
            return true;
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Oh damn. An error has occurred",
                description: "You tried to log in but something shit happened...",
                className: "outline-none border-none bg-red-600 text-slate-200",
            });
            return false;
        }
    }

    async function logout() {
        try {
            Logout();
            toast({
                variant: "destructive",
                title: "Bye bye little bitch!!",
                description: "You just logged out, now go to hell...",
                className: "outline-none border-none bg-green-600 text-slate-200",
            });
            return true;
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Oh damn. An error has occurred",
                description: "You tried to log out but something shit happened...",
                className: "outline-none border-none bg-red-600 text-slate-200",
            });
            console.error(err);
            return false;
        }
    }

    return (
        <div className='bg-forum-bg flex flex-row h-full w-full justify-between'>
            <Sidebar logout={logout} handleLoginDialog={handleOpenLoginDialog} className='absolute w-[300px] min-h-screen bg-slate-50 border-r-[1px] border-r-slate-200 top-0 flex px-5 gap-5 z-50' />
            <div className='w-[300px]' />
            <main className='bg-slate-50 overflow-y-auto w-[calc(100%-300px)] min-h-screen'>
                <Outlet />
            </main>
            <LoginDialog submitLogin={login} inputs={loginInputs} setInputs={setLoginInputs} setOpen={setLoginDialog} open={loginDialog} />
            <Toaster />
        </div>
    );
}