// src/components/MainLayout.tsx
import { FireOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" icon={<FireOutlined />}>Hot</Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
                </Menu>
            </Header>
            <main style={{minHeight:400}}>
                <Outlet /> {/* This is where nested routes will be rendered */}
            </main>
            <footer>
                <p>© 2023 My Application</p>
            </footer>
        </>
    );
};

export default MainLayout;
