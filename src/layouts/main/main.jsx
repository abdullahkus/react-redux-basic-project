import { Card, Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

export const Main = () => {
    return (
        <Layout>
            <Content
                style={{
                    padding: '24px',
                    height: '100dvh',
                }}
            >
                <Card
                    style={{
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Card>
            </Content>
        </Layout>
    );
};
