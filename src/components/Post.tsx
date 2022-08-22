import { Box, Container, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface PostProps {
    title: string
    id: string
}

const Post: FC<PostProps> = (children: PostProps) => {
    const navigate = useNavigate();
    return (
        <Box height='60' width='90%' borderRadius='20px' bg='blackAlpha.200' onClick={() => navigate("/dashboard/job/" + children.id)}>
            <Container p={1}>
                <Text>{children.title}</Text>
            </Container>
        </Box>
    )
}

export default Post