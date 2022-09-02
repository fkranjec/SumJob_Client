import { ButtonGroup, Button, Text, Container, VStack, Heading, Box, Center } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom';
import landingImg from '../../assets/landing.jpg';

type Props = {}

const Landing = (props: Props) => {
    return (
        <VStack bg='orange' h='100vh' minWidth='100vw' w='100vw' >
            <ButtonGroup flex='0 0 50px' height='50px' gap='2' display='flex' w='100%'>
                <Button colorScheme='blackAlpha' bg='transparent' h='50px' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/login"><Text m='auto'>Login</Text></Button>
                <Button colorScheme='blackAlpha' bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/register"><Text m='auto'>Register</Text></Button>
                <Button colorScheme='blackAlpha' bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} to="/register-company"><Text m='auto'>Register company</Text></Button>
            </ButtonGroup>
            <Box w='100vw' mt='0px !important' m='0px' p='0px' flex='1 1 80%' bgImage={landingImg} bgPosition='center' backdropFilter='blur(100px)' bgSize='cover'>
                <Center h='100%' mt='0px' display='flex' flexDirection='column'>
                    <Heading color='white' textShadow='-1px -1px 0 #000,1px -1px 0 orange,-1px 1px 0 orange,1px 1px 0 orange;' fontFamily="'Kalam', cursive" fontSize='9xl'>SumJob</Heading>
                    <Heading color='white' textShadow='-1px -1px 0 #000,1px -1px 0 orange,-1px 1px 0 orange,1px 1px 0 orange;' fontFamily="'Kalam', cursive" fontSize='5xl' >Find your new Job in few minutes!</Heading>
                </Center>
            </Box>

        </VStack >
    )
}

export default Landing