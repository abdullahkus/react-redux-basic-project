import { Button, Col, Form, Input, Modal, Row, Select, notification } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import postsService from '../../services/postsService';
import usersService from '../../services/usersService';
import { updatePost } from '../../store/slices/postSlice';
const { Option } = Select;
const { TextArea } = Input;

export const EditPostModal = ({ isModalOpen, setIsModalOpen, post }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({
            title: post.title,
            body: post.body,
            userId: post.userId,
        });
    }, [post]);

    const {
        loading: usersLoading,
        error: usersError,
        data: users,
    } = useFetch(() => usersService.getAll(0));

    const onEditHandler = async (values) => {
        const updatedPost = await postsService
            .put(post.id, values)
            .then((response) => response.data)
            .catch((e) => console.log(e));

        if (updatedPost) {
            dispatch(updatePost(updatedPost));
            notification.success({
                message: 'Post Updated',
                description: 'The post has been successfully updated.',
                placement: 'bottomRight',
                duration: 2,
            });
            setIsModalOpen(false);
        }
    };

    return (
        <Modal
            title='Edit Post'
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            centered
            width={'1024px'}
            footer={
                <>
                    <Button onClick={() => setIsModalOpen(false)} htmlType='button'>
                        Vazgeç
                    </Button>
                    <Button form='edit-post' htmlType='submit' type='primary'>
                        Kaydet
                    </Button>
                </>
            }
        >
            <Form form={form} name='edit-post' onFinish={onEditHandler} autoComplete='on'>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            label='Title'
                            name='title'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='userId'
                            label='User'
                            rules={[{ required: true, message: 'Please input your user!' }]}
                        >
                            <Select placeholder='Select a user' allowClear loading={usersLoading}>
                                {users?.map((user) => (
                                    <Option key={user.id} value={user.id}>
                                        {user.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label='Body'
                    name='body'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your body!',
                        },
                        {
                            min: 8,
                            message: 'Please enter at least 8 characters for your body!',
                        },
                    ]}
                >
                    <TextArea rows={8} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
