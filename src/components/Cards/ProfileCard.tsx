import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ProfileCardProps {
    id?: string
    username?: string
    image?: string
    email?: string
    userType?: string
}

export interface IProfileShort {
    id: string
    username: string
    image: string
    email: string
    address: {
        city: string
        postalCode: string
        state: string
        street: string
        streetNumber: string
    }
    companyInfo: {
        companyName: string
    }
    userType: string
}

const JOBS_BY_USER = gql`
    query JobsByUser($userId: ID!) {
        jobsByUser(userId: $userId) {
            name
            id
        }
    }
`

const JOBS_BY_COMPANY = gql`
    query JobsByCompany($userId: ID!){
        jobsByCompany(userId: $userId){
            id
            name
        }
    }
`

const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const navigate = useNavigate();
    const { data, loading } = useQuery(JOBS_BY_USER, { variables: { userId: props.id }, fetchPolicy: 'cache-and-network' });
    const companyJobs = useLazyQuery(JOBS_BY_COMPANY, { variables: { userId: props.id }, fetchPolicy: 'cache-and-network' });

    useEffect(() => {
        if (props?.userType === 'COMPANY') companyJobs[0]();
    }, [])
    return (
        <Box height='fit-content' width='90%' borderRadius='10px' bg='blackAlpha.200'>
            <VStack p={7}>
                <Avatar onClick={() => { navigate('/dashboard/profile/' + props?.id) }} src={props.image} />
                <Text>{props?.id}</Text>
                <Text>{props?.username}</Text>
                {data && props.userType === 'USER' && (

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Jobs Applied
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
                                    {
                                        data?.jobsByUser.map((job) => (
                                            <Button mt='5px' flex='0 1 30%' colorScheme='orange' key={job.id}>{job.name}</Button>
                                        ))
                                    }
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                )}
                {data && props.userType === 'COMPANY' && (

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Jobs avaliable
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-between'>
                                    {
                                        companyJobs[1].data?.jobsByCompany.map(job => (
                                            <Button mt='5px' flex='0 1 30%' colorScheme='orange' key={job.id}>{job.name}</Button>
                                        ))
                                    }
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                )}
                {!data && <Spinner></Spinner>}
            </VStack>
        </Box>

    )
}

export default ProfileCard