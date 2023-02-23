import Layout from '../layout/index'
import Login from '../views/login/Login'
import NotFound from '../component/NotFound'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {
    createHashRouter,
    DataRouteObject,
    IndexRouteObject,
    NonIndexRouteObject,
    redirect,
    RouteObject,
} from "react-router-dom";
import React from 'react';
import { type } from 'os';


let routerStatic = [{
    path: "/",
    loader: () => {
        return redirect('/main');
    },
}, {
    path: "*",
    element: React.createElement(NotFound),
}, {
    path: "/login",
    element: React.createElement(Login),
}]

export type RouteObjectWithMeta = DataRouteObject & {
    meta?: {
        icon: React.ReactNode,
        name: string
    },
    children?: RouteObjectWithMeta[]
}
export type RouteObjects = RouteObject & {
    children?: RouteObjects[],
    meta?: {
        icon: React.ReactNode,
        name: string
    }
}
let routerRaw: RouteObjects[]= [
    {
        path: "/main",
        element: React.createElement(Layout),
        meta: {
            icon: React.createElement(UserOutlined),
            name: '用户管理'
        },
        id: 'main',
        children: [{
            id: 'main',
            path: "/main",
            element: React.createElement(Layout),
            meta: {
                icon: React.createElement(UserOutlined),
                name: '用户管理'
            },
        }]
    },
]
const router = createHashRouter(routerRaw.concat(routerStatic));
export {
    router,
    routerRaw,
    routerStatic
}