import { useLazyQuery, useQuery } from '@apollo/client';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Input, Text, VStack, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Button, HStack } from '@chakra-ui/react'
import gql from 'graphql-tag';
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer';
import Layout from '../../../components/Layout'
import JobCard from '../../../components/Cards/JobCard'

const GET_JOBS = gql`
    query GetJobsFilters($offset:Int, $limit: Int, $filters: FilterInput) {
        getJobsFilters(offset:$offset, limit: $limit, filters: $filters) {
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
    getJobsFilters: {
        jobs: any[]
        totalCount: number
    }

}

const Jobs = () => {
    let limit = 3;
    let offset = 0;
    let changed: boolean = false;
    const [filters, setFilters] = useState({
        salary: {
            from: 0,
            to: 10000
        },
        text: null
    });
    const [jobs, setJobs] = useState([]);

    const { loading, refetch, data, fetchMore, error } = useQuery<JobsResponse>(GET_JOBS, {
        variables: { offset: offset, limit: limit, filters: { ...filters } }, fetchPolicy: 'no-cache', onCompleted(res) {
            setJobs(res.getJobsFilters.jobs)
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
                                <Input onChange={(e) => { setFilters({ ...filters, text: e.target.value }) }} placeholder='Enter text here'></Input>
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
                                <HStack>
                                    <Text><b>From:</b> {filters.salary.from}</Text>
                                    <Text><b>To:</b> {filters.salary.to}</Text>
                                </HStack>
                                <RangeSlider
                                    min={0}
                                    max={30000}
                                    step={500}
                                    aria-label={['min', 'max']}
                                    colorScheme='orange'
                                    defaultValue={[filters.salary.from, filters.salary.to]}
                                    onChangeEnd={(val) => setFilters({ ...filters, salary: { from: val[0], to: val[1] } })}
                                >
                                    <RangeSliderTrack>
                                        <RangeSliderFilledTrack />
                                    </RangeSliderTrack>
                                    <RangeSliderThumb index={0} />
                                    <RangeSliderThumb index={1} />
                                </RangeSlider>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    {
                        !loading && jobs?.length !== 0 && jobs?.map((job: any) => (
                            <JobCard title={job.name} id={job.id} key={job.id} content={{ title: job?.content?.title, body: job.content?.body, footer: job.content?.footer }} salary={{ from: job.averageSalary?.from, to: job.averageSalary?.to }} user={{ ...job.company }} createdAt={job.timeCreated} />
                        ))
                    }
                    {
                        !loading && jobs?.length !== 0 && (
                            <InView
                                onChange={async (inView) => {
                                    if (limit < data?.getJobsFilters.totalCount) {
                                        limit += limit;
                                    } else {
                                        limit = data?.getJobsFilters.totalCount
                                    }
                                    if (inView) {
                                        const { data, error } = await fetchMore({
                                            variables: {
                                                offset: offset,
                                                limit: limit
                                            }
                                        })
                                        if (jobs.length < data.getJobsFilters.totalCount) {
                                            console.log("UNUTAR IF")
                                            setJobs([...data?.getJobsFilters.jobs])
                                        }
                                    }
                                }}
                            ></InView>
                        )
                    }
                </VStack>
            </Layout.Mid>
        </Layout>
    )
}

export default Jobs