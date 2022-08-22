import { Box, Circle, Container, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const NewPost = (children: any) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <Box height='fit-content' width='90%' borderRadius='20px' bg='blackAlpha.200' animation='.3s linear'>
            <Container p={7}>
                <Input onFocus={() => setExpanded(true)} onBlur={() => setExpanded(false)} bg='blackAlpha.200' placeholder='Enter body Here' />
                <Text>{children.title}</Text>
            </Container>
            {
                expanded &&
                <Container p={7}>
                    <Text>TITLE</Text>
                    <Text>SALARY</Text>
                    <Text>OCCUPATION</Text>
                    <Text>LOCATION</Text>
                </Container>
            }
            <VStack>
                <Circle size='50px' borderRadius='50px' bg='blackAlpha.200' onClick={() => { setExpanded(!expanded) }} />
            </VStack>
        </Box>
    )
}

export default NewPost