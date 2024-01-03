import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Divider, List, Row, Spin, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddPostModal } from './add-post-modal';
const { Paragraph, Title } = Typography;

export const HomeContainer = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const posts = useSelector((state) => state.posts);

    return (
        <>
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <Title level={2}>Posts</Title>
                </Col>
                <Col>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalOpen(true)}
                    />
                </Col>
            </Row>
            <Divider />
            <Spin spinning={posts.status === 'loading'}>
                {posts.error && (
                    <Alert
                        message='Error'
                        description={posts.error}
                        type='error'
                        showIcon
                        style={{ marginBottom: '16px' }}
                    />
                )}
                {posts.posts.length > 0 && (
                    <List
                        grid={{ gutter: 16, column: 3, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                        dataSource={posts.posts}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={<Link to={`/post/${item.id}`}>{item.title}</Link>}>
                                    <Paragraph
                                        ellipsis={{ rows: 3 }}
                                        style={{ minHeight: '4.5em' }}
                                    >
                                        {item.body}
                                    </Paragraph>
                                </Card>
                            </List.Item>
                        )}
                    />
                )}
            </Spin>
            {isAddModalOpen && (
                <AddPostModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
            )}
        </>
    );
};
