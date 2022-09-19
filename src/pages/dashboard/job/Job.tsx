import { useMutation, useQuery } from '@apollo/client';
import { Box, VStack, Text, Container, Heading, Avatar, HStack, Button, Divider } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import Map from '../../../components/Map';
import ProfileCard, { IProfileShort } from '../../../components/Cards/ProfileCard';
import SkillCard from '../../../components/Cards/SkillCard';

const GET_JOB = gql`
    query getJob($jobId: ID!){
        getJob(jobId: $jobId) {
            id
            name
            skills
            averageSalary{
                from
                to
            }
            applied{
                id
                image
            }
            content{
                title
                body
                footer
            }
            timeCreated
            period {
                from
                to
            }
            company {
                id
                username
                image

                address {
                    city
                    postalCode
                    streetNumber
                    street
                    state
                    latlng{
                        lat
                        lng
                    }
                }
                companyInfo {
                    companyName
                    description
                    numberOfEmployees
                    typeOfCompany
                }
                userType
            }
        }
    }
`

const APPLY_TO_JOB = gql`
    mutation ApplyToJob($jobId: ID!, $userId: ID!) {
        applyToJob(jobId: $jobId, userId: $userId) {
            jobId
            userId
        }
    }
`;

const Job = () => {
    const { id } = useParams();
    const { data, loading, error, refetch } = useQuery(GET_JOB, { variables: { jobId: id } })
    const auth = useOutletContext<IProfileShort>();
    const [applied, setApplied] = useState<boolean>(false);
    const [usersApplied, setUsersApplied] = useState([]);
    const [applyToJob] = useMutation(APPLY_TO_JOB, { variables: { jobId: id, userId: auth.id } })
    const handleApply = () => {
        applyToJob().then(res => {
            toast.success("Applied")
            setApplied((applied) => true);
        }).catch(err => {
            toast.error(err.message)
            setApplied((applied) => false)
        })
    }
    useEffect(() => {
        refetch();
        setUsersApplied((users) => data?.getJob.applied);
        setApplied(checkUsers(data?.getJob.applied, auth.id))

    }, [loading, data])
    return (
        <Layout>
            <Layout.Left>
                {data && <ProfileCard id={data?.getJob?.company.id} username={data?.getJob?.company.username} image={data?.getJob?.company?.image} userType={data?.getJob?.company?.userType} />}
            </Layout.Left>
            <Layout.Mid>
                <VStack w='100%' h='100%'>
                    <Box bg='blackAlpha.200' p='10' display='flex' flexDirection='column' minH='fit-content' borderRadius='10px' w='100%'>
                        <Container flex='0 0 50px'>
                            <Heading m='auto 0' fontSize='3xl' fontWeight='bold'>{data?.getJob?.content.title}</Heading>
                        </Container>
                        <Divider borderColor='orange'></Divider>
                        <Container m='25px 0'>
                            <Text>{data?.getJob?.content.body}</Text>
                        </Container>

                        <Container m='25px 0'>
                            <Text fontSize='xl' fontWeight='semibold'>{data?.getJob.averageSalary.from} HRK - {data?.getJob.averageSalary.to} HRK</Text>
                        </Container>

                        <Container m='25px 0'>
                            <b>Skills needed:</b>
                            <HStack wrap='wrap'>


                                {
                                    data?.getJob?.skills.map((skill, index) => (
                                        <SkillCard key={index} skill={skill}></SkillCard>
                                    ))
                                }
                            </HStack>
                        </Container>

                        <Container m='25px 0'>
                            <Text><b>Users applied</b></Text>
                            <HStack>
                                {
                                    usersApplied?.map((user) => (
                                        <Avatar key={user.id} src={user.image} />
                                    ))
                                }
                            </HStack>

                        </Container>
                        {auth.userType === 'USER' && <Button m='25px 0' disabled={applied} isLoading={loading} onClick={() => handleApply()} colorScheme='orange' >Apply to job</Button>}
                    </Box>
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <VStack w='100%' ml='20px'>
                    {data?.getJob && !loading &&
                        <Container w='100%' borderRadius='10px' p={0} h='fit-content'>
                            <Map lat={data?.getJob.company.address.latlng.lat} lng={data?.getJob.company.address.latlng.lng} />
                        </Container>
                    }
                </VStack>
            </Layout.Right>
        </Layout>
    )
}

function checkUsers(users: any[], user: string): boolean {
    let exists: boolean = false;
    users?.forEach(val => {
        if (val.id === user) {
            exists = true;
        }
    })
    return exists
}

export default Job