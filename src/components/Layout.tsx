import { VStack, Flex, Show, Container } from '@chakra-ui/react'
import React from 'react'
import { scrollBarStyle } from '../utils/styles';

const Layout = ({ children }: any) => {
    return (
        <VStack marginTop='0px !important' w='100%' h='calc(100vh - 80px)' >
            <Flex w='100%'>
                {children}
            </Flex>
        </VStack >
    )
}

Layout.Left = (props: any) => (
    <Show above="sm">
        <VStack flex='0 0 30%' p='3' >
            {props.children}
        </VStack>
    </Show>);
Layout.Mid = (props: any) => (
    <Container gap='2' p='3' maxW='unset' flex='1 0 40%' height='calc(100vh - 70px)' position='relative' overflowY='scroll' css={scrollBarStyle}>
        {props.children}
    </Container>
)
Layout.Right = (props: any) => (
    <Show above="lg">
        <VStack maxHeight='calc(100vh - 70px)' height='fit-content' flex='0 0 30%' p='3'>
            {props.children}
        </VStack>
    </Show>
)

export default Layout