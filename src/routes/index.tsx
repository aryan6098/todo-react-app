import React from 'react';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';


interface RouteConfig {
    path: string;
    component: React.ReactNode;
}

const publicRoutes: RouteConfig[] = [
    {
        path: '/',
        component: <Login />,
    },

];

const authProtectedRoutes: RouteConfig[] = [
    {
        path: '/dashboard',
        component: <Dashboard />,
    },

];

export { authProtectedRoutes, publicRoutes };
