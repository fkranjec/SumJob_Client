import { Avatar, Box, Button, Container, Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaRulerHorizontal } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface PostProps {
    title?: string
    content?: {
        title?: string
        body?: string
        footer?: string
    }
    id?: string
    salary?: {
        from: number,
        to: number
    }
    createdAt?: string
    user?: CompanyDetails
}

interface CompanyDetails {
    name?: string
    image?: string
    id?: string
}

const Post: FC<PostProps> = (props: PostProps) => {
    const navigate = useNavigate();
    return (
        <VStack height='60' mt='2' p={0} width='90%' borderRadius='10px' bg='blackAlpha.200' >
            <Container bg='rgba(255,134,38,1.00)' flex='0 0 20%' w='100%' minW='100%' display='flex' flexDirection='row' borderRadius='10px'>
                <Avatar size='sm' m='auto 0' src={props.user?.image} _hover={{}} />
                <Text fontSize='sm' m='auto 10px'>{props?.user?.name}</Text>
                <Text m='auto 0' ml='auto' >{new Date(props.createdAt).toDateString()}</Text>
            </Container>
            <Container flex='0 0 80%' mt='0px !important' p={3} m='0px' display='flex' flexDirection='column'>
                <Text fontWeight='bold' fontSize='2xl'>{props.content?.title}</Text>
                <Divider borderColor='tomato' m='auto 0'></Divider>
                <Text>{props.content?.body}</Text>
                <Box display='flex' flexDirection='row' justifyContent='space-between' m='auto 10px'>
                    <Text fontWeight='semibold' fontSize='xl' m='auto 0'>{props.salary?.from} - {props.salary?.to}</Text>
                    <Button bg=' rgba(255,134,38,1.00)' _hover={{ bg: ' rgba(255,134,38,.5)' }} onClick={() => navigate("/dashboard/job/" + props.id)}>See more</Button>
                </Box>
            </Container>
        </VStack>
    )
}

export default Post