import { Button, Col, Form, Input, Modal, Row, Select, notification } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import postsService from '../../services/postsService';
import usersService from '../../services/usersService';
import { addPost } from '../../store/slices/postSlice';
const { Option } = Select;
const { TextArea } = Input;

export const AddPostModal = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();

    const {
        loading: usersLoading,
        error: usersError,
        data: users,
    } = useFetch(() => usersService.getAll(0));

    const onAddHandler = async (values) => {
        const post = await postsService
            .post(values)
            .then((response) => response.data)
            .catch((e) => console.log(e));

        if (post) {
            dispatch(addPost(post));
            notification.success({
                message: 'Post Added',
                description: 'The post has been successfully added.',
                placement: 'bottomRight',
                duration: 2,
            });
            setIsModalOpen(false);
        }
    };

    return (
        <Modal
            title='Add Post'
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            centered
            width={'1024px'}
            footer={
                <>
                    <Button onClick={() => setIsModalOpen(false)} htmlType='button'>
                        Vazgeç
                    </Button>
                    <Button form='add-post' htmlType='submit' type='primary'>
                        Kaydet
                    </Button>
                </>
            }
        >
            <Form name='add-post' onFinish={onAddHandler} autoComplete='on'>
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
