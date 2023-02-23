import React from 'react';
import './App.less';
import './styles/common.less'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {router} from './router';
// 组件大驼峰命名法（首字母大写）
// 图片等静态资源通过http请求，不能使用相对路径获取 使用import logo from './logo.png' src= {logo}
import {
    RouterProvider,
} from "react-router-dom";

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
