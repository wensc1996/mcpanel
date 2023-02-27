import Layout from '../layout/index'
import Login from '../views/login/Login'
import NotFound from '../component/NotFound'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import routerPlain from './routerPlain'
import {
    createHashRouter,
    redirect,
    RouteObject,
} from "react-router-dom";
import React from 'react';

let routerStatic: RouteObject[] = [{
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

// let routerRaw: any[] = [
//     {
//         path: "/main",
//         element: React.createElement(Layout),
//         meta: {
//             icon: React.createElement(UserOutlined),
//             name: '用户管理'
//         },
//         children: [{
//             path: "register",
//             element: React.createElement(Layout),
//             meta: {
//                 icon: React.createElement(UserOutlined),
//                 name: '用户注册'
//             },
//         }]
//     },
// ]
const router = createHashRouter(routerStatic);
export {
    router,
    routerStatic
}