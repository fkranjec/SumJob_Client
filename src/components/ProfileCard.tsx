import { Box, Circle, Text, VStack } from '@chakra-ui/react'
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

const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const navigate = useNavigate();
    return (
        <Box height='500px' width='80%' borderRadius='20px' bg='blackAlpha.200'>
            <VStack p={7}>
                <Circle onClick={() => { navigate('/dashboard/profile/' + props?.id) }} size='50px' borderRadius='50px' bg='blackAlpha.200' />
                <Text>{props?.id}</Text>
                <Text>{props?.username}</Text>

            </VStack>
        </Box>

    )
}

export default ProfileCard