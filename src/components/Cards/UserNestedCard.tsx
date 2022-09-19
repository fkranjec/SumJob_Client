import { useMutation } from '@apollo/client'
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IProfileShort } from '../../pages/dashboard/Dashboard'

interface IUserNestedCard {
    user: any,
    refetch: () => any
}

const CREATE_ROOM = gql`
    mutation room($roomInput: RoomInput!){
        room(roomInput: $roomInput){
            name
        }
    }
`

const UserNestedCard = (props: IUserNestedCard) => {
    const navigate = useNavigate();
    const authContext = useOutletContext<IProfileShort>()
    const [createRoom, { data, loading }] = useMutation(CREATE_ROOM, { fetchPolicy: 'network-only' })
    const handleStartChat = () => {
        console.log(authContext);
        console.log(props.user.id + " " + authContext.id);
        createRoom({ variables: { roomInput: { userId: props?.user.id, companyId: authContext.id } } }).then(res => {
            props.refetch();
        }).catch(err => {
            toast.error(err.message)
        })
    }
    return (
        <HStack w='100%' justifyContent='space-evenly' h='fit-content' bg='blackAlpha.200' p={5} borderRadius='10px'>
            <Avatar src={props.user.image} />
            <VStack justifyContent='flex-start'>
                <Text w='100%' textAlign='start'>{props.user.userInfo.firstName}</Text>
                <Text w='100%' textAlign='start'>{props.user.userInfo.lastName}</Text>
            </VStack>
            <Button colorScheme='orange' onClick={() => navigate('/dashboard/profile/' + props.user.id)}>See profile</Button>
            <Button colorScheme='orange' onClick={() => handleStartChat()}>Start chat</Button>
        </HStack>

    )
}

export default UserNestedCard