import { gql, useQuery } from '@apollo/client'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Circle, Input, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ProfileCardProps {
    id?: string
    username?: string
    image?: string
    email?: string
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
}

const JOBS_BY_USER = gql`
    query JobsByUser($userId: ID!) {
        jobsByUser(userId: $userId) {
            name
            id
        }
    }
`

const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const navigate = useNavigate();
    const { data, loading } = useQuery(JOBS_BY_USER, { variables: { userId: props.id } })
    return (
        <Box height='500px' width='90%' borderRadius='10px' bg='blackAlpha.200'>
            <VStack p={7}>
                <Avatar onClick={() => { navigate('/dashboard/profile/' + props?.id) }} src={props.image} />
                <Text>{props?.id}</Text>
                <Text>{props?.username}</Text>
                {data && (

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Jobs Applied
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Box display='flex' flexDirection='row' flexWrap='wrap'>
                                    {
                                        data?.jobsByUser.map((job) => (
                                            <Button flex='0 1 20%' colorScheme='orange' key={job.id}>{job.name}</Button>
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