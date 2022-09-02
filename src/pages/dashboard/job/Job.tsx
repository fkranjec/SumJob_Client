import { useMutation, useQuery } from '@apollo/client';
import { Box, VStack, Text, Container, Heading, Avatar, HStack, Button, Divider } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import Map from '../../../components/Map';
import ProfileCard, { IProfileShort } from '../../../components/ProfileCard';

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
                address {
                    city
                    postalCode
                    streetNumber
                    street
                    state
                }
                companyInfo {
                    companyName
                    description
                    numberOfEmployees
                    typeOfCompany
                }
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
        console.log(applied);
    }, [loading, data])
    return (
        <Layout>
            <Layout.Left>
                <ProfileCard id={data?.getJob?.company.id} username={data?.getJob?.company.username} />
            </Layout.Left>
            <Layout.Mid>
                <VStack w='100%' h='100%'>
                    <Box bg='blackAlpha.200' p='10' display='flex' flexDirection='column' minH='fit-content' borderRadius='10px' w='100%'>
                        <Container flex='0 0 50px'>
                            <Heading m='auto 0' fontSize='3xl' fontWeight='bold'>TITLE</Heading>
                        </Container>
                        <Divider borderColor='orange'></Divider>
                        <Container m='25px 0'>
                            <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, ducimus itaque quasi, ex reiciendis eos sed officia, debitis non consectetur at facilis possimus asperiores eum aspernatur tenetur quae maiores tempore impedit veritatis consequuntur similique ipsum? Animi quo tempore recusandae eligendi doloribus deserunt, reiciendis officia. Officia tempore nostrum odit iusto! Suscipit assumenda nam commodi quisquam aut voluptatibus reprehenderit fugit quam a quasi, qui odit. Vero, unde similique quam provident voluptatem reiciendis rerum natus quibusdam perferendis. Neque sequi aspernatur quia nisi cum aliquam saepe asperiores corporis suscipit vero? Deserunt suscipit aspernatur, esse quis numquam explicabo porro labore beatae debitis, reiciendis odit voluptatum.</Text>
                        </Container>

                        <Container m='25px 0'>
                            <Text>Salary - Salary</Text>
                        </Container>

                        <Container m='25px 0'>
                            <Text>Skills</Text>
                        </Container>

                        <Container m='25px 0'>
                            <Text>Users applied</Text>
                            <HStack>
                                {
                                    usersApplied?.map((user) => (
                                        <Avatar key={user.id} src={user.image} />
                                    ))
                                }
                            </HStack>

                        </Container>
                        <Button m='25px 0' disabled={applied} isLoading={loading} onClick={() => handleApply()} colorScheme='orange' >Apply to job</Button>
                    </Box>
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <VStack w='100%' ml='20px'>
                    <Container w='100%' borderRadius='10px' p={0} h='fit-content'>
                        <Map />
                    </Container>
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