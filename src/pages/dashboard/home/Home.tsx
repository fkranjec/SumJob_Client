import { Container, Flex, Show, VStack, Text, Input, useColorMode, Spinner, Spacer, Button, ScaleFade, Circle, Box } from '@chakra-ui/react'
import Post from '../../../components/Post'
import { scrollBarStyle } from '../../../utils/styles'

import { SubscriptionResult, useMutation, useQuery, useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import ProfileCard from '../../../components/ProfileCard';
import Layout from '../../../components/Layout';
import NewPost from '../../../components/NewPost';
import Rooms from '../../../components/Chat/Rooms';
import { AuthContext } from '../../../store/auth-context';

const SAVE_POST = gql`
   query getJobs{
    getJobs{
        id
    }
   }
`;

const LATEST_POSTS = gql`
    query getJobs{
        getJobs{
            id
        }
    }
`;

const FETCH_POSTS_QUERY = gql`
    query getJobs{
        getJobs {
            id
            name
            description
            company{
                id
            }
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

    const authContext = useContext(AuthContext);

    /*const [savePost, { error }] = useMutation<
        { createPost: PostInventory }, { body: string }
    >(SAVE_POST, {
        variables: { body: postBody }
    });*/

    //const subscription: SubscriptionResult = useSubscription(LATEST_POSTS);

    const handleNewPost = async () => {
        setIsLoading(true);
        //await savePost({ variables: { body: postBody } });
        setPostBody('');
        setIsLoading(false);
    }

    useEffect(() => {

        if (!loading) {
            console.log(data);
            setIsLoading(false);
        }
    }, [data])
    return (
        <Layout>

            <Layout.Left>
                <ProfileCard id={authContext.user.id} />
            </Layout.Left>

            <Layout.Mid>
                <VStack flexDirection='column-reverse'>

                    {loading && <Spinner></Spinner>}
                    {!loading && data.getJobs.map((job: any) => (
                        <Post title={job.description} id={job.id} key={job.name} />
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