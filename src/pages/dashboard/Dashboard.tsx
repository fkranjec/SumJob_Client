import { Center, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation'

const Dashboard = () => {

    return (
        <VStack>
            <Navigation />
            <Center maxW='1600px' w='100%' h='calc(100vh - 70px)' overflowY='hidden' >
                <Outlet />
            </Center>
        </VStack>


    )
}

export default Dashboard