import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import '../styles/layout/index.less'
import UseState from '../views/hookTest/UseState'
import { useAppSelector, useAppDispatch } from '../hooks/storeHook'
import { RootState } from '../store/store';
import img from '../assets/images/u=104930965,2278568771&fm=26&gp=0.jpg'
import {routerRaw} from '../router';
import { MenuItemType } from 'antd/lib/menu/hooks/useItems';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));



const App: React.FC = () => {
    const items2: MenuProps['items'] = []
    // routerRaw.map(routerItem => {
    //     return {
    //         key : routerItem.path, 
    //         icon: React.createElement(UserOutlined),
    //         label: routerItem.meta?.name,
    //         onClick: (param: any) => {console.log(param)},
    //     }
    // })
    const userInfo = useAppSelector((state: RootState) => state.userInfo)
    const handleMenuClicked = (param: {item: any, key: string, keyPath: string, domEvent : any}) => {
        console.log(param)
    }
    return (
        <Layout className='view overfow-y-h'>
            <Header className="header row jc-sb">
                <div className='flex row'>
                    <div className="logo">
                        <img src={img} alt="" style={{height: '40px', width: '40px'}}/>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} className="flex"/>
                </div>
                <div style={{color: 'red'}}>{userInfo.account}</div>
            </Header>
            <Layout className="flex">
                <Sider width={200} className="site-layout-background overflow-y overfow-x-h">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['user-manage']}
                        defaultOpenKeys={['user-manage']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background overflow-y"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <UseState></UseState>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default App;