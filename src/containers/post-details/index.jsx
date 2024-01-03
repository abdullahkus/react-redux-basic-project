import React from 'react';
import {
    CaretLeftOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import { Alert, Button, Col, Divider, Row, Spin, Typography, theme, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import postsService from '../../services/postsService';
import usersService from '../../services/usersService';
import { Card } from 'antd';
import { Modal } from 'antd';
import { Space } from 'antd';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../../store/slices/postSlice';
import { EditPostModal } from './edit-post-modal';
const { Title, Paragraph, Text } = Typography;

export const PostDetailsContainer = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { id } = useParams();
    const post = useSelector((state) => state.posts.posts.find((post) => post.id === Number(id)));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        loading: userLoading,
        error: userError,
        data: user,
    } = useFetch(
        () => (post?.userId ? usersService.getById(post?.userId) : Promise.resolve(null)),
        [post?.userId],
    );

    const handleBackRoute = () => {
        navigate(-1);
    };

    const onDeleteHandler = async (id) => {
        Modal.confirm({
            title: 'Attention',
            content: (
                <Space direction='vertical'>
                    <Alert
                        message='Deleting the post will result in the loss of access to information.'
                        type='warning'
                    />
                    <p>Are you sure you want to proceed with this action?</p>
                </Space>
            ),
            icon: <ExclamationCircleFilled style={{ color: '#ff4d4f' }} />,
            okText: 'Confirm',
            onOk: () => {
                postsService
                    .deleteById(id)
                    .then(() => {
                        dispatch(removePost(id));
                        notification.success({
                            message: 'Success',
                            description: 'The post has been successfully deleted.',
                            placement: 'bottomRight',
                            duration: 2,
                        });

                        navigate('/');
                    })
                    .catch((e) => console.log(e));
            },
            okType: 'danger',
            cancelText: 'Cancel',
        });
    };

    return (
        <Spin spinning={userLoading}>
            {post && (
                <>
                    <Row gutter={12} align={'middle'} justify={'center'}>
                        <Col>
                            <Button
                                type='dashed'
                                icon={<CaretLeftOutlined />}
                                size='large'
                                onClick={handleBackRoute}
                            />
                        </Col>
                        <Col>
                            <Title level={2}>{post.title}</Title>
                            <Text type='secondary'>{user && `${user.name}`}</Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Paragraph style={{ whiteSpace: 'pre-line' }}>{post.body}</Paragraph>
                </>
            )}
            <Card
                bodyStyle={{ padding: 8 }}
                style={{
                    position: 'fixed',
                    bottom: '48px',
                    right: '48px',
                    zIndex: 1000,
                }}
            >
                <Row gutter={12}>
                    <Col>
                        <Button
                            type='primary'
                            icon={<EditOutlined />}
                            onClick={() => setIsEditModalOpen(true)}
                        />
                    </Col>
                    <Col>
                        <Button
                            type='primary'
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteHandler(post?.id)}
                        />
                    </Col>
                </Row>
            </Card>
            {isEditModalOpen && (
                <EditPostModal
                    isModalOpen={isEditModalOpen}
                    setIsModalOpen={setIsEditModalOpen}
                    post={post}
                />
            )}
        </Spin>
    );
};
