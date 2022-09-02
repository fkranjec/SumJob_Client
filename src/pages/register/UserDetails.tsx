import { Box, Button, Center, Container, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/login.jpg';


export interface RegisterControl {
    nextStep?: () => void
    handleChange: (input: string) => (e: any) => void
    prevStep?: () => void
}
interface IUserDetailsControls extends RegisterControl {
    values: IUserDetails
}

export interface IUserDetails {
    username: string
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
}

const UserDetails = (props: IUserDetailsControls) => {

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        console.log(props.values);
    }, [])
    return (
        <Center bg='white' h='100vh' w='100vw' p='0'>
            <HStack boxShadow='dark-lg' p='0px' bg='white' h='800px' minW='1200px' margin='auto 0' borderRadius='30px'>
                <Container overflow='hidden' flex='0 0 50%' p='0' borderLeftRadius='10px' h='800px' w='100%' m='0px'>
                    <Container overflow='hidden' p='0' m='0' position='relative' transform='scale(1,1)' transition='all 0.3s ease-out' _hover={{ transform: 'scale(1.1,1.1)', transition: 'all 0.3s ease-in-out' }} width='100%' bgImage={loginImg} h='800px' bgSize='cover' bgPosition='center'></Container>
                </Container>
                <VStack flex='0 0 50%' fontFamily='sans-serif'>
                    <Heading fontSize='4xl' fontFamily='sans-serif'>Register</Heading>
                    <Heading fontSize='xl' fontFamily='sans-serif' >User details</Heading>
                    <Input value={props.values.firstName} onChange={props.handleChange('firstName')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='First name'></Input>
                    <Input value={props.values.lastName} onChange={props.handleChange('lastName')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Last name'></Input>
                    <Input value={props.values.username} onChange={props.handleChange('username')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Username'></Input>
                    <Input value={props.values.email} onChange={props.handleChange('email')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Email'></Input>
                    <InputGroup size='lg' w='40%'>
                        <Input
                            borderColor='grey'
                            value={props.values.password}
                            focusBorderColor='black'
                            pr='4.5rem'
                            color='black'
                            type={show ? 'text' : 'password'}
                            _placeholder={{ color: 'inherit' }}
                            placeholder='Enter password'
                            onChange={props.handleChange('password')}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button colorScheme='orange' h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup size='lg' w='40%'>
                        <Input
                            borderColor='grey'
                            focusBorderColor='black'
                            pr='4.5rem'
                            color='black'
                            type={show ? 'text' : 'password'}
                            _placeholder={{ color: 'inherit' }}
                            placeholder='Confirm password'
                            value={props.values.confirmPassword}
                            onChange={props.handleChange('confirmPassword')}
                        />
                    </InputGroup>
                    <Button colorScheme='orange' disabled={props.values.username === '' || props.values.password === '' || props.values.email === '' || props.values.confirmPassword === '' || props.values.firstName === '' || props.values.lastName === '' ? false : false} mb='auto' onClick={props.nextStep}>Next step!</Button>
                </VStack>

            </HStack>
        </Center>
    )
}



export default UserDetails