import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import * as R from 'ramda';
import PostCard from '../components/PostCard';
import { User, Post } from '../api/types';
import { useHistory } from 'react-router-dom';
import { getPosts, createPost } from '../api';
import TextArea from 'antd/lib/input/TextArea';
import { Store } from 'antd/lib/form/interface';

const { Content } = Layout;

interface Props {
    currentUser: User;
}

export default function FrontPage(props: Props) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const history = useHistory();
    const location = history.location;

    useEffect(() => {
        async function getPostsFromApi() {
            const postsFromApi = await getPosts();
            if (posts === null) {
                alert(`Something went wrong with api`);
                return;
            }
            setPosts(postsFromApi!);
            
        }
        if (location.pathname !== "/") {
            location.pathname = "/";
            history.push(location);
        }
        if (isFirstRender) {
            setIsFirstRender(false);
            getPostsFromApi();
        }

    }, [posts, isFirstRender, history, location]);

    function updatePost(post: Post) {
        const indexOfPost = R.findIndex((p) => p.id === post.id, posts);
        const postsCopy = R.clone(posts);
        postsCopy[indexOfPost] = post;
        setPosts(postsCopy);
    }

    function removePost(post: Post) {
        setPosts(R.without([post], posts));
    }

    async function createNewPost(values: Store) {
        const { title, text } = values;
        const newPost = await createPost(title, text);
        if (newPost === null) {
            alert('Something went wrong with creating new post');
            return;
        }
        setPosts(R.prepend(newPost, posts));
    }

    return (
        <Layout>
            <Content>
                <Row>
                    <Col span={12}>
                        { posts.map((post) => (
                            <PostCard
                                currentUser={props.currentUser}
                                post={post}
                                key={post.id}
                                updatePostInState={updatePost}
                                removePostFromState={removePost} />
                        ))}
                    </Col>
                    <Col span={12}>
                        <Form onFinish={createNewPost}>
                            <Form.Item label="Title" name="title" rules={[{ required: true, message: `Title can't be empty.` }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Text" name="text" rules={[{ required: true, message: `Text can't be empty.` }]}>
                                <TextArea />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}