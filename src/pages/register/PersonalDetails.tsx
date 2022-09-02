import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, HStack, Container, Menu } from '@chakra-ui/react'
import React from 'react'
import { RegisterControl } from './UserDetails'
import loginImg from '../../assets/login.jpg';
import { StandaloneSearchBox } from '@react-google-maps/api';

interface IPersonalDetailsControls extends RegisterControl {
    values: IPersonalDetails
    register: () => void
}

export interface IPersonalDetails {

}

const PersonalDetails = (props: IPersonalDetailsControls) => {
    let searchBox;
    const onLoad = ref => searchBox = ref;

    const onPlacesChanged = () => console.log(searchBox);
    return (
        <Center bg='white' h='100vh' w='100vw' p='0'>
            <HStack boxShadow='dark-lg' p='0px' bg='white' h='800px' minW='1200px' margin='auto 0' borderRadius='30px'>
                <Container overflow='hidden' flex='0 0 50%' p='0' borderLeftRadius='10px' h='800px' w='100%' m='0px'>
                    <Container overflow='hidden' p='0' m='0' position='relative' transform='scale(1,1)' transition='all 0.3s ease-out' _hover={{ transform: 'scale(1.1,1.1)', transition: 'all 0.3s ease-in-out' }} width='100%' bgImage={loginImg} h='800px' bgSize='cover' bgPosition='center'></Container>
                </Container>
                <VStack flex='1 0 50%' fontFamily='sans-serif' p='20' m='auto'>
                    <Heading fontSize='4xl' fontFamily='sans-serif'>Register</Heading>
                    <Heading fontSize='xl' fontFamily='sans-serif' >Personal details</Heading>
                    <Input></Input>
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <Input w='auto'></Input>
                    </StandaloneSearchBox>
                    <Menu>

                    </Menu>
                    <HStack w='100%' display='flex' justifyContent='space-around'>
                        <Button onClick={props.prevStep}>Previous step!</Button>
                        <Button colorScheme='orange' mb='auto' onClick={props.register}>Register!</Button>
                    </HStack>
                </VStack>

            </HStack>
        </Center>
    )
}

export default PersonalDetails;