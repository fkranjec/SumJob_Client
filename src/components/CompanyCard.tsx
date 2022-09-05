import { Box, VStack, Text, Heading, Divider, Button, HStack, Avatar } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ICompanyCard {
    id: string
    companyName: string
    description: string
    numberOfEmployees: string
    typeOfCompany: string
    image: string
}

const CompanyCard = (props: ICompanyCard) => {
    const navigate = useNavigate();
    return (
        <VStack borderRadius='10px' w='100%' bg='blackAlpha.200' h='300px' >
            <Box display='flex' flexDirection='row' borderTopRadius='10px' w='100%' bg='rgba(255,134,38,1.00)' flex='0 0 50px'>
                <Avatar src={props.image} margin='auto 10px' size='sm'></Avatar>
                <Heading margin='auto 10px' fontSize='xl'>{props.companyName}</Heading>
            </Box>
            <Box display='flex' justifyContent='space-between' flexDirection='column' flex='1 1 80%' w='100%' p={10}>
                <Text>{props.description}</Text>
                <Divider borderColor='orange'></Divider>
                <HStack justifyContent='space-between'>
                    <Text>Number of employees: {props.numberOfEmployees}</Text>
                    <Text>Type of company: {props.typeOfCompany}</Text>
                </HStack>

                <Button mt='auto' marginLeft='auto' onClick={() => navigate('/dashboard/profile/' + props.id)}>Go to profile!</Button>
            </Box>
        </VStack>
    )
}

export default CompanyCard