import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, HStack, Container, Menu, Textarea, Select } from '@chakra-ui/react'
import React from 'react'
import loginImg from '../../assets/login.jpg';
import { Autocomplete, StandaloneSearchBox } from '@react-google-maps/api';
import { RegisterControl } from './CompanyDetails';

interface ICompanyDescControls extends RegisterControl {
    values: ICompanyDesc
    register: () => void
}

export interface ICompanyDesc {
    address: {
        city: string,
        street: string,
        streetNumber: string,
        postalCode: number,
        latlng: {
            lat: number,
            lng: number
        }
        state: string
    }
    description?: string
    typeOfCompany?: string
    numberOfEmployees?: string
}

const PersonalDetails = (props: ICompanyDescControls) => {
    let searchBox;
    const onLoad = ref => searchBox = ref;

    const onPlacesChanged = () => console.log(searchBox.getPlace());
    return (
        <Center bg='white' h='100vh' w='100vw' p='0'>
            <HStack boxShadow='dark-lg' p='0px' bg='white' h='800px' minW='1200px' margin='auto 0' borderRadius='30px'>
                <Container overflow='hidden' flex='0 0 50%' p='0' borderLeftRadius='10px' h='800px' w='100%' m='0px'>
                    <Container overflow='hidden' p='0' m='0' position='relative' transform='scale(1,1)' transition='all 0.3s ease-out' _hover={{ transform: 'scale(1.1,1.1)', transition: 'all 0.3s ease-in-out' }} width='100%' bgImage={loginImg} h='800px' bgSize='cover' bgPosition='center'></Container>
                </Container>
                <VStack flex='1 0 50%' fontFamily='sans-serif' p='20' m='auto'>
                    <Heading fontSize='4xl' color='black' fontFamily='sans-serif'>Register</Heading>
                    <Heading fontSize='xl' color='black' fontFamily='sans-serif' >Personal details</Heading>
                    <Textarea color='black' onChange={props.handleChange('description')} placeholder='Tell us something about company' _placeholder={{ color: 'grey' }} borderColor='grey'></Textarea>
                    <Select onChange={props.handleChange('numberOfEmployees')} placeholder='Number of employees'>
                        <option value='1 - 5' key={1}>1 - 5</option>
                        <option value='6 - 10' key={2}>6 - 10</option>
                        <option value='11 - 20' key={3}>11 - 20</option>
                        <option value='21 - 40' key={4}>21 - 40</option>
                        <option value='41 - 60' key={5}>41 - 60</option>
                        <option value='61 - 100' key={6}>61 - 100</option>
                    </Select>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacesChanged}>
                        <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} placeholder='Adress' w='auto'></Input>
                    </Autocomplete>
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