import { VStack, Spinner } from '@chakra-ui/react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Suspense, lazy, FC, useEffect, useState } from 'react';
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
            totalCount
            jobs{        
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
    }
`;

interface JobsResponse {
    getJobs: {
        jobs: any[]
        totalCount: number
    }

}

const Home: FC = () => {
    let limit = 3;
    let offset = 0;
    let changed: boolean = false;
    const [jobs, setJobs] = useState([]);

    const { loading, data, fetchMore, error } = useQuery<JobsResponse>(GET_JOBS, {
        variables: { offset: offset, limit: limit }, fetchPolicy: 'no-cache', onCompleted(res) {
            console.log(res);
            setJobs(res.getJobs.jobs)
            console.log(jobs);
        },
    });

    const authContext = useOutletContext<IProfileShort>();

    useEffect(() => {
    }, [data, loading])
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
                        !loading && jobs?.length !== 0 && jobs?.map((job: any) => (
                            <Post title={job.name} id={job.id} key={job.id} content={{ title: job?.content?.title, body: job.content?.body, footer: job.content?.footer }} salary={{ from: job.averageSalary?.from, to: job.averageSalary?.to }} user={{ ...job.company }} createdAt={job.timeCreated} />
                        ))
                    }
                    {
                        !loading && jobs?.length !== 0 && (
                            <InView
                                onChange={async (inView) => {
                                    if (!changed) {
                                        offset = offset + limit;
                                    }
                                    console.log(offset)
                                    if (inView) {
                                        const { data, error } = await fetchMore({
                                            variables: {
                                                offset: offset,
                                                limit: limit
                                            }
                                        })
                                        console.log(jobs)
                                        let newJobs = [];
                                        newJobs = jobs

                                        data.getJobs.jobs.forEach(job => {
                                            console.log(newJobs.includes(job))
                                            if (!newJobs.includes(job)) {

                                                newJobs.push(job)
                                            }

                                        })
                                        console.log(jobs)
                                        if (jobs.length <= data.getJobs.totalCount) {
                                            console.log("UNUTAR IF")
                                            setJobs([...newJobs])
                                        } else {

                                            console.log("=====test=====");
                                            console.log("offset: ", offset)
                                            console.log("limit: ", limit)
                                            console.log("jobs length: ", jobs.length)
                                            console.log(inView);
                                            console.log("==============");
                                            limit = data.getJobs.totalCount - jobs.length;
                                            changed = true;
                                        }

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