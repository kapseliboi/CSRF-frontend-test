import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

export default function RegisterPage() {
    return (
        <Row>
            <Col span={24}>
                <Form>
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username.' }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Email address"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email address.' }]}>
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
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
