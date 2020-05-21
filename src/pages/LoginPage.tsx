import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { User } from '../api/types';
import { Store } from 'antd/lib/form/interface';
import { login } from '../api';
import { useHistory } from 'react-router-dom';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export default function LoginPage(props: Props) {
    const history = useHistory();

    const [authFailed, setAuthFailed] = useState(false);
    const [authErrored, setAuthErrored] = useState(false);
    async function onFinish(values: Store) {
        const user = await login(values.usernameOrEmail, values.password);
        if (user) {
            setAuthErrored(false);
            setAuthFailed(false);
            props.setUser(user);
            const location = history.location;
            location.pathname = '/';
            history.push(location);
        } else if (user === undefined) {
            setAuthFailed(true);
        } else {
            setAuthErrored(true);
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Form onFinish={onFinish}>
                    <Form.Item
                    label="Username or email"
                    name="usernameOrEmail"
                    rules={[{ required: true, message: 'Please enter your username or email address.' }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password.' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        {authFailed &&
                            <Alert message="Username or password is incorrect." type="error" />
                        }
                        {authErrored &&
                            <Alert message="Something went wrong. Please try again later." type="error" />
                        }
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
