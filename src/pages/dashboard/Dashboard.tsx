import { Box, Center, Container, Flex, ScaleFade, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import { AuthConsumer } from '../../store/auth-context'
import Home from './home/Home'

const Dashboard = () => {

    useEffect(() => {
        console.log(AuthConsumer)
        return () => {
        }
    }, [])

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