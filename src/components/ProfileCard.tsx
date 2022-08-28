import { useQuery } from '@apollo/client'
import { Box, Circle, Container, Image, Text, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../store/auth-context'

const GET_USER = gql`
    query getUser($userId: ID!){
        getUser(userId: $userId) {
            id
            username
            image
            email
            address {
                city
                postalCode
                state
                street
                streetNumber
            }
            companyInfo {
                companyName
            }

        }
    }
`;

export interface ProfileCardProps {
    id?: string
}

interface IProfile {
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

const ProfileCard: React.FC<ProfileCardProps> = (children: ProfileCardProps) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<IProfile>();
    const { data, loading } = useQuery(GET_USER, { variables: { userId: children.id } })
    useEffect(() => {
        if (!loading) {
            setUserData({ ...data?.getUser })
        }
    }, [loading])
    return (
        <Box height='500px' width='80%' borderRadius='20px' bg='blackAlpha.200'>
            <VStack p={7}>
                <Circle onClick={() => { navigate('/dashboard/profile/' + userData?.id) }} size='50px' borderRadius='50px' bg='blackAlpha.200' />
                <Text>{userData?.username}</Text>
                <Text>{userData?.id}</Text>
            </VStack>
        </Box>

    )
}

export default ProfileCard