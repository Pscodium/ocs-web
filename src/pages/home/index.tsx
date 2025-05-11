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
            <div className='flex h-screen overflow-hidden bg-white'>
                {windowWidth < 1280 ? (
                    <Sidebar.DrawerSidebar />
                ) : (
                    <div className='fixed left-0 top-0 h-full z-50'>
                        <Sidebar.Default />
                    </div>
                )}
                <main className='flex-1 overflow-auto bg-white' style={{ marginLeft: windowWidth >= 1280 ? '320px' : '0' }}>
                    <Outlet />
                </main>
                <Toaster />
            </div>
            <LoginDialog />
        </>
    );
}