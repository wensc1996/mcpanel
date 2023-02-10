import React from 'react';
import './App.css';
import './styles/common.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Layout from './layout/index'
import Login from './views/login/Login'
import NotFound from './component/NotFound'
// 组件大驼峰命名法（首字母大写）
// 图片等静态资源通过http请求，不能使用相对路径获取 使用import logo from './logo.png' src= {logo}
import {
    createHashRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
let isLogin: number = 2
const router = createHashRouter([
    {
        path: "/",
        loader: () => {
            if (isLogin == 1) {
                return redirect('/aa');
            } else {
                return redirect('/login');
            }
        },
        // children: [
        //   {
        //     path: "team",
        //     element: <Team />,
        //     loader: teamLoader,
        //   },
        // ],
    },
    {
        path: "/aa",
        element: <Layout />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
function App() {
    return (
        // <Layout/>
        <RouterProvider router={router} />
    );
}

export default App;
