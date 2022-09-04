import { Box, Button, Center, Container, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/login.jpg';


export interface RegisterControl {
    nextStep?: () => void
    handleChange: (input: string) => (e: any) => void
    prevStep?: () => void
}
interface IUserDetailsControls extends RegisterControl {
    values: ICompanyDetails
}

export interface ICompanyDetails {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const CompanyDetails = (props: IUserDetailsControls) => {

    const [show, setShow] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

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
                    <Heading fontSize='4xl' color='black' fontFamily='sans-serif'>Register company</Heading>
                    <Heading fontSize='xl' color='black' fontFamily='sans-serif' >Company details</Heading>
                    <Input value={props.values.username} onChange={props.handleChange('username')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'grey' }} placeholder='Company name'></Input>
                    <Input value={props.values.email} type='email' onChange={props.handleChange('email')} borderColor='grey' focusBorderColor='black' color='black' size='lg' w='40%' _placeholder={{ color: 'grey' }} placeholder='Email'></Input>
                    <InputGroup size='lg' w='40%'>
                        <Input
                            borderColor='grey'
                            value={props.values.password}
                            focusBorderColor='black'
                            pr='4.5rem'
                            color='black'
                            type={show ? 'text' : 'password'}
                            _placeholder={{ color: 'grey' }}
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
                            type={showConfirm ? 'text' : 'password'}
                            _placeholder={{ color: 'grey' }}
                            placeholder='Confirm password'
                            value={props.values.confirmPassword}
                            onChange={props.handleChange('confirmPassword')}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button colorScheme='orange' h='1.75rem' size='sm' onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button colorScheme='orange' disabled={props.values.username === '' || props.values.password === '' || props.values.email === '' || props.values.confirmPassword === '' ? true : false} mb='auto' onClick={props.nextStep}>Next step!</Button>
                </VStack>

            </HStack>
        </Center>
    )
}



export default CompanyDetails