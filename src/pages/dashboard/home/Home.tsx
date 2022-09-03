import { VStack, Spinner } from '@chakra-ui/react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Suspense, lazy, FC, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { InView } from 'react-intersection-observer';

import Post from '../../../components/Post'
import Layout from '../../../components/Layout';
import { IProfileShort } from '../Dashboard';

const ProfileCard = lazy(() => import('../../../components/ProfileCard'));
const Rooms = lazy(() => import('../../../components/Chat/Rooms'));

const GET_JOBS = gql`
    query GetJobs($offset:Int, $limit: Int) {
        getJobs(offset:$offset, limit: $limit) {
                id
                name
                content{
                    title
                    body
                    footer
                }
                averageSalary{
                    from
                    to
                }
                timeCreated
                company{
                    id
                    username
                    image
                }
        }
    }
`;

const Home: FC = () => {
    const limit = 3;
    let offset = 0;

    const { loading, data, fetchMore } = useQuery(GET_JOBS, { variables: { offset: offset, limit: limit } });

    const authContext = useOutletContext<IProfileShort>();

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <Layout>

            <Layout.Left>
                <Suspense fallback={<Spinner></Spinner>}>
                    <ProfileCard id={authContext?.id} username={authContext?.username} image={authContext?.image} />
                </Suspense>
            </Layout.Left>

            <Layout.Mid>
                <VStack flexDirection='column'>
                    {
                        !loading && data && data?.getJobs.map((job: any) => (
                            <Post title={job.name} id={job.id} key={job.id} content={{ title: job.content.title, body: job.content.body, footer: job.content.footer }} salary={{ from: job.averageSalary.from, to: job.averageSalary.to }} user={{ ...job.company }} createdAt={job.timeCreated} />
                        ))
                    }
                    {
                        !loading && data && (
                            <InView
                                onChange={async (inView) => {
                                    offset = offset + limit;
                                    console.log(inView)
                                    if (inView) {
                                        await fetchMore({
                                            variables: {
                                                offset: offset,
                                                limit: limit
                                            }
                                        })
                                    }
                                }}
                            ></InView>
                        )
                    }
                </VStack>
            </Layout.Mid>

            <Layout.Right>
                <Suspense fallback={<Spinner></Spinner>}>
                    <Rooms id={authContext?.id} />
                </Suspense>
            </Layout.Right>
        </Layout >
    )
}


export default Home