import { Container, Flex, Show, VStack, Text, Input, useColorMode, Spinner, Spacer, Button, ScaleFade, Circle, Box } from '@chakra-ui/react'
import Post from '../../../components/Post'
import { scrollBarStyle } from '../../../utils/styles'

import { SubscriptionResult, useMutation, useQuery, useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import ProfileCard from '../../../components/ProfileCard';
import Layout from '../../../components/Layout';
import NewPost from '../../../components/NewPost';
import Rooms from '../../../components/Chat/Rooms';

const SAVE_POST = gql`
    mutation createP($body: String!){
        createPost(body: $body) {
            id
            body
            username
        }
    }
`;

const LATEST_POSTS = gql`
    subscription newPost{
        postCreated {
            body
            username 
        }
    }
`;

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
        id
        body
        createdAt
        username
    }
}
`


interface PostInventory {
    id: string;
    body: string;
    username: string;
}

const Home = () => {


    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    const [isLoading, setIsLoading] = useState(true);

    const [postBody, setPostBody] = useState('');

    const [savePost, { error }] = useMutation<
        { createPost: PostInventory }, { body: string }
    >(SAVE_POST, {
        variables: { body: postBody }
    });

    const subscription: SubscriptionResult = useSubscription(LATEST_POSTS);

    const handleNewPost = async () => {
        setIsLoading(true);
        await savePost({ variables: { body: postBody } });
        setPostBody('');
        setIsLoading(false);
    }

    useEffect(() => {
        if (!loading) {
            setIsLoading(false);
        }
    }, [subscription])
    return (
        <Layout>

            <Layout.Left>
                <ProfileCard username='fkranjec' firstName='Filip' lastName='Kranjec' />
            </Layout.Left>

            <Layout.Mid>
                <VStack flexDirection='column-reverse'>

                    {loading && <Spinner></Spinner>}
                    {!loading && data.getPosts.map((post: any) => (
                        <Post title={post.body} id={post.id} key={post.id} />
                    ))}
                    {!loading && <NewPost title='NEW POST in progress...' />}

                </VStack>
            </Layout.Mid>

            <Layout.Right>

                <Rooms />
                <Text maxW='unset'>
                    Poruke ako postoje
                </Text>
            </Layout.Right>

        </Layout>
    )
}


export default Home