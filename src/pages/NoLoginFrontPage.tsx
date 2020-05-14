import React, { useEffect } from 'react';
import { Row, Button } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function NoLoginFrontPage() {
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== "/") {
            location.pathname = "/";
            history.push(location);
        }
    });
    return (
        <Row justify="space-around">
            <Link to="/login">
                <Button size="large" type="primary">
                    Sign in
                </Button>
            </Link>
            <Link to="/register">
                <Button size="large" type="primary">
                    Sign up
                </Button>
            </Link>
        </Row>
    );
};
