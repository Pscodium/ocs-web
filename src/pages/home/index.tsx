import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginDialog from '@/components/common/login.dialog';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/common/sidebar';

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className='bg-forum-bg flex flex-row h-full w-full justify-between'>
                {windowWidth < 1280 ? <Sidebar.DrawerSidebar /> : <Sidebar.Default />}
                <main className='bg-white overflow-y-auto w-full min-h-screen'>
                    <Outlet />
                </main>
                <Toaster />
            </div>
            <LoginDialog />
        </>
    );
}
