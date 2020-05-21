import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';

const { Header } = Layout;

interface Props {
    
}

export default function() {
    return (
        <Layout>
            <Header>
                <Menu selectedKeys={["home"]} mode="horizontal">
                    <Menu.Item key="home">
                        Home
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Avatar />
                        
                    </Menu.Item>
                </Menu>

            </Header>
        </Layout>
    );
}
