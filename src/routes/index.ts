import { lazy } from 'react';
import * as uuid from 'uuid';

const Tools = lazy(() => import('@/pages/home/subpages/tools'));
const Articles = lazy(() => import('@/pages/home/subpages/articles'));
const Settings = lazy(() => import('@/pages/home/subpages/settings'));
const Storage = lazy(() => import('@/pages/home/subpages/storage'));
const Markdown = lazy(() => import('@/pages/home/subpages/tools/subpages/markdown'));
const UuidGenerator = lazy(() => import('@/pages/home/subpages/tools/subpages/uuid'));
const DateTime = lazy(() => import('@/pages/home/subpages/tools/subpages/datetime'));


const coreRoutes = [
    {
        path: '/tools',
        title: 'Tools',
        component: Tools,
        id: uuid.v4(),
    },
    {
        path: '/tools/markdown',
        title: 'Markdown',
        component: Markdown,
        id: uuid.v4(),
    },
    {
        path: '/tools/uuid',
        title: 'Uuid Generator',
        component: UuidGenerator,
        id: uuid.v4(),
    },
    {
        path: '/tools/datetime',
        title: 'Datetime generator',
        component: DateTime,
        id: uuid.v4(),
    },
    {
        path: '/storage',
        title: 'Storage',
        component: Storage,
        id: uuid.v4()
    },
    {
        path: '/articles',
        title: 'Articles',
        component: Articles,
        id: uuid.v4()
    },
    {
        path: '/settings',
        title: 'Settings',
        component: Settings,
        id: uuid.v4()
    }
];

const routes = [...coreRoutes];
export default routes;
