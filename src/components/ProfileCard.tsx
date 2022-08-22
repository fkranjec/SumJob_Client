import { Box, Circle, Container, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../store/auth-context'

export interface ProfileCardProps {
    firstName: string
    lastName: string
    username: string
}

const ProfileCard: React.FC<ProfileCardProps> = (children: ProfileCardProps) => {
    const navigate = useNavigate();
    return (
        <AuthConsumer>
            {({ user }) => (
                <Box height='500px' width='80%' borderRadius='20px' bg='blackAlpha.200'>
                    <VStack p={7}>
                        <Circle onClick={() => { navigate('/dashboard/profile/' + user.id) }} size='50px' borderRadius='50px' bg='blackAlpha.200' />
                        <Text>{user.username}</Text>
                        <Text>{user.id}</Text>
                    </VStack>
                </Box>
            )}

        </AuthConsumer>
    )
}

export default ProfileCard