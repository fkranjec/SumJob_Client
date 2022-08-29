import { useQuery } from '@apollo/client'
import { Container, VStack, Circle, Input, Button, Text, Box } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
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
        if (!loading) {
            console.log(data?.roomsByUser)
            setRooms(data?.roomsByUser)
        }
    }, [loading])
    return (
        <Container p={3} bg='blackAlpha.200'>
            <VStack>
                {rooms.map((room) =>
                    <Chat key={room.id} id={room.id}></Chat>
                )}
            </VStack>
        </Container>
    )
}

export default Rooms