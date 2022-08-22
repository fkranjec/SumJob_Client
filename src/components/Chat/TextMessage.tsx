import { Box, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface TextMessage {
    id: string;
    body: string;
    user: number;
}

const TextMessage = (text: TextMessage) => {
    useEffect(() => { console.log(text) })
    return (
        <Box display='flex' justifyContent='space-between' width='100%' height='100%' flexDirection='row' p={3} >
            <Box p={2} width='fit-content' bg={text.user === 1 ? 'blackAlpha.200' : 'green.200'} marginLeft={text.user == 1 ? 'auto !important' : '0px !important'} borderRadius='8px' marginRight={text.user == 2 ? 'auto !important' : '0px !important'}>
                <Text key={text.id}>{text.body}</Text>
            </Box>
        </Box>
    )
}

export default TextMessage