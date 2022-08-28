import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { RegisterControl } from './UserDetails'

interface IPersonalDetailsControls extends RegisterControl {
    values: IPersonalDetails
    register: () => void
}

export interface IPersonalDetails {

}

const PersonalDetails = (props: IPersonalDetailsControls) => {
    return (
        <Center bg='beige' h='100vh' w='100vw'>
            <VStack bg='tomato' h='50%' w='50%' margin='auto 0' justifyContent='space-around' borderRadius='30px'>
                <Heading color='white'>Personal details</Heading>
                <Input type='file' variant='unstyled'></Input>
                <Input onChange={props.handleChange('firstName')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='First name'></Input>
                <Input onChange={props.handleChange('lastName')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Last name'></Input>
                <Input onChange={props.handleChange('username')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Username'></Input>
                <Input onChange={props.handleChange('email')} focusBorderColor='white' color='white' size='lg' w='40%' _placeholder={{ color: 'inherit' }} placeholder='Email'></Input>
                <HStack>
                    <Button onClick={props.prevStep}>Previous page</Button>
                    <Button onClick={() => props.register()}>Register!</Button>
                </HStack>

            </VStack>
        </Center>
    )
}

export default PersonalDetails;