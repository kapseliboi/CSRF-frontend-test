import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { register } from '../api';

const { Text } = Typography;

enum RegistrationStatus {
    success,
    conflict,
    failed,
};

export default function RegisterPage() {
    const [success, setSuccess] = useState<RegistrationStatus | undefined>(undefined);

    async function doRegistration(values: Store) {
        const { username, email, password } = values;
        const apiSuccess = await register(username, email, password);
        if (apiSuccess === null) {
            setSuccess(RegistrationStatus.failed);
        } else if (!apiSuccess) {
            setSuccess(RegistrationStatus.conflict);
        } else {
            setSuccess(RegistrationStatus.success);
        }
    }
    return (
        <Row>
            <Col span={24}>
                <Form onFinish={doRegistration}>
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
                { success === RegistrationStatus.success &&
                    <Text>We have sent you a confirmation email. Please check your email inbox.</Text>
                }
                { success === RegistrationStatus.conflict &&
                    <Text type="danger">Username is already in use</Text>
                }
                { success === RegistrationStatus.failed &&
                    <Text>Something went wrong, oopsie.</Text>
                }
            </Col>
        </Row>
    );
}
