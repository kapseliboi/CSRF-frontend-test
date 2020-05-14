import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

export default function LoginPage() {
    return (
        <Row>
            <Col span={24}>
                <Form>
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
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
