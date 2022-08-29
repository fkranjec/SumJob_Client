import { VStack, Text, Spinner, Button } from '@chakra-ui/react'
import Post from '../../../components/Post'

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import ProfileCard from '../../../components/ProfileCard';
import Layout from '../../../components/Layout';
import NewPost from '../../../components/NewPost';
import Rooms from '../../../components/Chat/Rooms';
import { useOutletContext } from 'react-router-dom';
import { IProfileShort } from '../Dashboard';
import InfiniteScroll from 'react-infinite-scroller'

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
    query GetJobs($cursor:ID, $limit: Int) {
        getJobs(cursor:$cursor, limit: $limit) {
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


    const { loading, data, fetchMore } = useQuery(FETCH_POSTS_QUERY, { variables: { cursor: "", limit: 1 } });

    const [isLoading, setIsLoading] = useState(true);

    const [postBody, setPostBody] = useState('');

    const authContext = useOutletContext<IProfileShort>()

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
            console.log(authContext);
            console.log(data);
            setIsLoading(false);
        }
    }, [data, fetchMore])
    return (
        <Layout>

            <Layout.Left>
                <ProfileCard id={authContext?.id} username={authContext?.username} />
            </Layout.Left>

            <Layout.Mid>
                <VStack flexDirection='column-reverse'>
                    <InfiniteScroll pageStart={0} loadMore={() => {
                        fetchMore({
                            updateQuery: (prev, { fetchMoreResult }) => {
                                const prevEntry = prev.entry;
                                const newJobs = fetchMoreResult.getJobs;
                                const newCursor = newJobs[newJobs.length - 1].id
                                return {
                                    getJobs: [...newJobs, ...prev.getJobs],
                                    __typename: prev.__typename,
                                    cursor: newCursor
                                }
                            }, variables: { cursor: "", limit: 3 }
                        });
                        setIsLoading(false);
                    }} hasMore={true || false} loader={<Spinner></Spinner>}>
                        {!loading && data.getJobs.map((job: any) => (
                            <Post title={job.description} id={job.id} key={job.name} />
                        ))}
                    </InfiniteScroll>


                    {!loading && <NewPost title='NEW POST in progress...' />}
                    <Button onClick={handleNewPost}>TEST</Button>
                </VStack>
            </Layout.Mid>

            <Layout.Right>

                <Rooms id={authContext?.id} />
                <Text maxW='unset'>
                    Poruke ako postoje
                </Text>
            </Layout.Right>

        </Layout >
    )
}


export default Home