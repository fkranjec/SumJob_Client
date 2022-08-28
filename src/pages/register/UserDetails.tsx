import { Box, Button, Center, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


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
        <Center bg='beige' h='100vh' w='100vw'>
            <VStack bg='tomato' h='50%' w='50%' margin='auto 0' justifyContent='space-around' borderRadius='30px'>
                <Heading color='white'>User details</Heading>
                <Input value={props.values.firstName} onChange={props.handleChange('firstName')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='First name'></Input>
                <Input value={props.values.lastName} onChange={props.handleChange('lastName')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Last name'></Input>
                <Input value={props.values.username} onChange={props.handleChange('username')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Username'></Input>
                <Input value={props.values.email} onChange={props.handleChange('email')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Email'></Input>
                <InputGroup size='lg' w='40%'>
                    <Input
                        value={props.values.password}
                        focusBorderColor='white'
                        pr='4.5rem'
                        color='white'
                        type={show ? 'text' : 'password'}
                        _placeholder={{ color: 'inherit' }}
                        placeholder='Enter password'
                        onChange={props.handleChange('password')}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size='lg' w='40%'>
                    <Input
                        focusBorderColor='white'
                        pr='4.5rem'
                        color='white'
                        type={show ? 'text' : 'password'}
                        _placeholder={{ color: 'inherit' }}
                        placeholder='Confirm password'
                        value={props.values.confirmPassword}
                        onChange={props.handleChange('confirmPassword')}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button mb='auto' onClick={props.nextStep}>Next step!</Button>
            </VStack>
        </Center>
    )
}

export default UserDetails