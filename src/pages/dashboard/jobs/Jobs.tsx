import { useQuery } from '@apollo/client';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Input, Text, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag';
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer';
import Layout from '../../../components/Layout'
import Post from '../../../components/Post'

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

const Jobs = () => {
    let limit = 3;
    let offset = 0;
    let changed: boolean = false;
    const [jobs, setJobs] = useState([]);

    const { loading, data, fetchMore, error } = useQuery<JobsResponse>(GET_JOBS, {
        variables: { offset: offset, limit: limit }, fetchPolicy: 'no-cache', onCompleted(res) {
            setJobs(res.getJobs.jobs)
        },
    });


    return (
        <Layout>
            <Layout.Left>
                <VStack width='100%'>
                    <Text>Filters</Text>
                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Text search
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Salary
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Location
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Skills
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Languages
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    {
                        !loading && jobs?.length !== 0 && jobs?.map((job: any) => (
                            <Post title={job.name} id={job.id} key={job.id} content={{ title: job?.content?.title, body: job.content?.body, footer: job.content?.footer }} salary={{ from: job.averageSalary?.from, to: job.averageSalary?.to }} user={{ ...job.company }} createdAt={job.timeCreated} />
                        ))
                    }
                    {
                        !loading && jobs?.length !== 0 && (
                            <InView
                                onChange={async (inView) => {
                                    if (limit < data?.getJobs.totalCount) {
                                        limit += limit;
                                    } else {
                                        limit = data?.getJobs.totalCount
                                    }
                                    if (inView) {
                                        const { data, error } = await fetchMore({
                                            variables: {
                                                offset: offset,
                                                limit: limit
                                            }
                                        })
                                        if (jobs.length < data.getJobs.totalCount) {
                                            console.log("UNUTAR IF")
                                            setJobs([...data?.getJobs.jobs])
                                        }
                                    }
                                }}
                            ></InView>
                        )
                    }
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <Center h='100%' bg='tomato' w='100%'>
                    JOB PREVIEW
                </Center>
            </Layout.Right>
        </Layout>
    )
}

export default Jobs