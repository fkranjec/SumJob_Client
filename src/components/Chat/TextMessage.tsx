import { Box, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { IProfileShort } from '../../pages/dashboard/Dashboard';

interface TextMessage {
    id: string;
    body: string;
    user: string;
    createdAt: Date
}

const TextMessage = (text: TextMessage) => {
    const auth = useOutletContext<IProfileShort>();
    return (
        <Box display='flex' justifyContent='space-between' width='100%' height='100%' flexDirection='row' p={3} >
            <Box p={2} display='flex' flexDirection='column' width='fit-content' minW='200px' bg={text.user === auth.id ? 'blackAlpha.200' : 'green.200'} marginLeft={text.user === auth.id ? 'auto !important' : '0px !important'} borderRadius='8px' marginRight={text.user !== auth.id ? 'auto !important' : '0px !important'}>
                <Text w='100%' ml={2} key={text.id}>{text.body}</Text>
                <Text w='fit-content' ml='auto' fontSize='xx-small'>{new Date(text.createdAt).getDate() !== new Date().getDate() ? new Date(text.createdAt).toDateString() : new Date(text.createdAt).toLocaleTimeString()}</Text>
            </Box>

        </Box>
    )
}

export default TextMessage