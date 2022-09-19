import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, HStack, Container, Menu, Textarea } from '@chakra-ui/react'
import React from 'react'
import { RegisterControl } from './UserDetails'
import loginImg from '../../assets/login.jpg';
import { Autocomplete, StandaloneSearchBox } from '@react-google-maps/api';
import { getAddressObject } from '../../utils/transformations';

interface IPersonalDetailsControls extends RegisterControl {
    values: IPersonalDetails
    handleChange: (input: string) => (e: any) => void
    register: () => void
}

export interface IPersonalDetails {
    address: any,
    description: string
}

const PersonalDetails = (props: IPersonalDetailsControls) => {
    let searchBox;
    const onLoad = ref => searchBox = ref;

    const onPlacesChanged = () => {
        console.log(searchBox.getPlace());
        const place = getAddressObject(searchBox.getPlace().address_components);
        const address = {
            target: {
                value: {
                    city: place.city,
                    street: place.street,
                    streetNumber: place.streetNumber,
                    postalCode: parseInt(place.postalCode),
                    latlng: {
                        lat: searchBox.getPlace().geometry.location.lat(),
                        lng: searchBox.getPlace().geometry.location.lng()
                    },
                    state: place.state
                }

            }
        }
        console.log(address);
        props.handleChange('address')(address)
    };
    return (
        <Center bg='white' h='100vh' w='100vw' p='0'>
            <HStack boxShadow='dark-lg' p='0px' bg='white' h='800px' minW='1200px' margin='auto 0' borderRadius='30px'>
                <Container overflow='hidden' flex='0 0 50%' p='0' borderLeftRadius='10px' h='800px' w='100%' m='0px'>
                    <Container
                        overflow='hidden'
                        p='0'
                        m='0'
                        position='relative'
                        transform='scale(1,1)'
                        transition='all 0.3s ease-out'
                        _hover={{ transform: 'scale(1.1,1.1)', transition: 'all 0.3s ease-in-out' }}
                        width='100%'
                        bgImage={loginImg}
                        h='800px'
                        bgSize='cover'
                        bgPosition='center'
                    >
                    </Container>
                </Container>
                <VStack flex='1 0 50%' fontFamily='sans-serif' p='20' m='auto'>
                    <Heading fontSize='4xl' color='black' fontFamily='sans-serif'>Register</Heading>
                    <Heading fontSize='xl' color='black' fontFamily='sans-serif' >Personal details</Heading>
                    <Textarea color='black' placeholder='Tell us something about yourself' _placeholder={{ color: 'grey' }} borderColor='grey'></Textarea>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacesChanged}>
                        <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} placeholder='Adress' w='auto'></Input>
                    </Autocomplete>
                    <Menu>

                    </Menu>
                    <HStack w='100%' display='flex' justifyContent='space-around'>
                        <Button color='black' colorScheme='blue' onClick={props.prevStep}>Previous step!</Button>
                        <Button colorScheme='orange' mb='auto' onClick={props.register}>Register!</Button>
                    </HStack>
                </VStack>

            </HStack>
        </Center>
    )
}

export default PersonalDetails;