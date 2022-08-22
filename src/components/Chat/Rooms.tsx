import { Container, VStack, Circle, Input, Button, Text, Box } from '@chakra-ui/react'
import React from 'react'
import Chat from './Chat'

type Props = {}

const Rooms = (props: Props) => {
    return (
        <Container p={3} bg='blackAlpha.200'>
            <VStack>
                <Chat />
                <Chat />
            </VStack>
        </Container>
    )
}

export default Rooms