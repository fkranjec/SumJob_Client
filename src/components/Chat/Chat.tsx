import { Container, Circle, VStack, Input, Button, Box, Center, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { messageLeft, messageRight, scrollBarStyle } from '../../utils/styles';
import TextMessage from './TextMessage';

type Props = {}

const Chat = (props: Props) => {
    const [newMessage, setNewMessage] = useState('');
    const [texts, setTexts] = useState([
        {
            id: '1',
            body: 'Hello World',
            user: 1
        },
        {
            id: '2',
            body: 'Hello World',
            user: 2
        },
        {
            id: '3',
            body: 'Hello World',
            user: 1
        },
        {
            id: '4',
            body: 'Hello World',
            user: 1
        },
        {
            id: '5',
            body: 'Hello World',
            user: 2
        },
        {
            id: '6',
            body: 'Hello World',
            user: 1
        },
        {
            id: '7',
            body: 'Hello World',
            user: 1
        },
        {
            id: '8',
            body: 'Hello World',
            user: 2
        },
        {
            id: '9',
            body: 'Hello World',
            user: 1
        }
    ]);
    const [expanded, setExpanded] = useState(false);

    const handleNewMessage = () => {
        setTexts([...texts, { id: (texts.length + 1).toString(), body: newMessage, user: 1 }]);
    }
    return (
        <Container p={3} bg='blackAlpha.100' >
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
                <Circle size='50px' borderRadius='50px' bg='blackAlpha.200' />
                {
                    expanded ? (<Center><FaChevronUp onClick={() => setExpanded(false)} /></Center>) : (<Center><FaChevronDown onClick={() => setExpanded(true)} /></Center>)
                }
            </Box>

            {
                expanded && (
                    <Box>
                        <VStack minHeight='200px' maxHeight='200px' overflowY='scroll' css={scrollBarStyle} p={6}>

                            {
                                texts && texts.map((text: any) => (
                                    <TextMessage id={text.id} body={text.body} user={text.user} key={text.id} />
                                ))
                            }

                        </VStack>
                        <Box display='flex' flexDirection='row'>
                            <Input onChange={(e) => setNewMessage(e.target.value)} />
                            <Button onClick={() => handleNewMessage()}>SEND</Button>
                        </Box>
                    </Box>
                )
            }


        </Container>
    )
}

export default Chat;