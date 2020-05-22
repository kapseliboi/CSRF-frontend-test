import React, { useState } from 'react';
import { Card, Typography, Button, Form, Input } from 'antd';
import { User, Post } from '../api/types';
import TextArea from 'antd/lib/input/TextArea';
import { Store } from 'antd/lib/form/interface';
import { editPost, deletePost } from '../api';

const { Text } = Typography;

interface Props {
    currentUser: User;
    post: Post;
    updatePostInState: (post: Post) => void;
    removePostFromState: (post: Post) => void;
}

export default function PostCard(props: Props) {
    const { currentUser, post, updatePostInState, removePostFromState } = props;
    const [isEditable, setIsEditable] = useState(false);
    const information = (
        <div>
            <Text type="secondary">{post.username}</Text>
            <br/>
            <Text type="secondary">{`Created at: ${post.createdAt}`}</Text>
            <br/>
            <Text type="secondary">{`Edited at: ${post.editedAt}`}</Text>
        </div>
    );
    
    function toggleEdit() {
        setIsEditable(!isEditable);
    }

    async function updateCard(values: Store) {
        const { title, text } = values;
        const newPost = await editPost(post.id, title, text);
        if (newPost === null) {
            alert(`Something went wrong with saving the edited post`);
            return;
        }
        toggleEdit();
        updatePostInState(newPost);
    }

    async function remove() {
        const success = await deletePost(post.id);
        if (success) {
            removePostFromState(post);
        } else {
            alert(`Something went wrong with removing the post`);
        }
    }

    function renderStaticCard() {
        return (
            <Card title={post.title} extra={information} style={{ width: '500px' }}>
                <Text>{post.text}</Text>
                {currentUser.username === post.username &&
                    <>
                        <Button type="primary" onClick={toggleEdit}>Edit</Button>
                        <Button type="primary" danger onClick={remove}>Delete</Button>
                    </>
                }
            </Card>
        );
    }

    function renderEditableCard() {
        const initialValues: Store = {
            title: post.title,
            text: post.text,
        };
        return (
            <Form onFinish={updateCard} initialValues={initialValues}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: `Title can't be empty.` }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Text" name="text" rules={[{ required: true, message: `Text can't be empty.` }]}>
                    <TextArea />
                </Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
                <Button danger onClick={toggleEdit}>Cancel</Button>
            </Form>
        );
    }

    return isEditable ? renderEditableCard() : renderStaticCard();
}
