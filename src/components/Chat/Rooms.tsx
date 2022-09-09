import { useQuery } from '@apollo/client'
import { Container, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { scrollBarStyle } from '../../utils/styles'
import Chat from './Chat'

interface Rooms {
    id?: string
}

const GET_ROOMS = gql`
    query getRoomsByUser($user: ID!) {
        roomsByUser(user: $user) {
            id
            name
        }
    }
`


const Rooms = (props: Rooms) => {

    const { data, loading } = useQuery(GET_ROOMS, { variables: { user: props?.id } })
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        console.log("TEST");
        if (!loading) {
            console.log(data?.roomsByUser)
            setRooms(data?.roomsByUser)
        }
    }, [loading])
    return (
        <Container overflowY='scroll' css={scrollBarStyle} h='100%' p={3} bg='blackAlpha.200' borderRadius='10px'>
            <VStack h='100%' >
                {rooms?.map((room) =>
                    <Chat key={room.id} id={room.id}></Chat>
                )}
            </VStack>
        </Container>
    )
}

export default Rooms