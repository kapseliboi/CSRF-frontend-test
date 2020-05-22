import React from 'react';
import { Layout, Menu, Avatar, Button, Typography } from 'antd';
import { User } from '../api/types';
import { logout } from '../api';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

interface Props {
    currentUser: User;
    setUser: (value: React.SetStateAction<User | undefined>) => void;
}

export default function(props: Props) {
    const history = useHistory();
    async function doLogout() {
        await logout();
        const location = history.location;
        location.pathname = "/";
        history.push(location);
        props.setUser(undefined);
    }
    return (
        <Layout>
            <Header>
                <Menu selectedKeys={["home"]} mode="horizontal">
                    <Menu.Item key="home">
                        Home
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Avatar />
                        <Text>{props.currentUser.username}</Text>
                        <Button type="primary" htmlType="button" onClick={doLogout}>
                            Sign out
                        </Button>
                    </Menu.Item>
                </Menu>

            </Header>
        </Layout>
    );
}
