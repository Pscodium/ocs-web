import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from '@/components/ui/loader';
import Initial from '@/pages/home/subpages/initial';
import routes from './index';
const Home = lazy(() => import('@/pages/home/index'));

export default function Router() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route index element={<Initial />} />
                    {routes.map(({ path, component: Component, id }) => (
                        <Route
                            path={path}
                            key={id}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <Component />
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    );
}
