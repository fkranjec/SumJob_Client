import { ButtonGroup, Button, Text, Container, VStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Landing = (props: Props) => {
    return (
        <VStack bg='tomato' h='100vh' minWidth='100vw' w='100vw'>


            <ButtonGroup height='50px' gap='2' display='flex' w='100%'>
                <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/login"><Text m='auto'>Login</Text></Button>
                <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/register"><Text m='auto'>Register</Text></Button>
                <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/register-company"><Text m='auto'>Register company</Text></Button>
            </ButtonGroup>
            <Heading>SumJob</Heading>
        </VStack>
    )
}

export default Landing