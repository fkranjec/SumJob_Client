import { SubscriptionResult, useMutation, useQuery, useSubscription } from '@apollo/client';
import { Container, Circle, VStack, Input, Button, Box, Center, Text, Avatar } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import { IProfileShort } from '../../pages/dashboard/Dashboard';
import { messageLeft, messageRight, scrollBarStyle } from '../../utils/styles';
import Rooms from './Rooms';
import TextMessage from './TextMessage';

interface Chat {
    id?: string
}

interface GetMessagesQuery {
    messages: [{
        id: string
        content: string
        author: {
            id: string
        }
        createdAt: Date
    }]
}

interface GetRoomQuery {
    getRoom: {
        userID1: {
            id: string,
            username: string
            image: string
        },
        userID2: {
            id: string,
            username: string
            image: string
        }
    }
}

const GET_MESSAGES = gql`
    query Messages($room: ID!) {
        messages(room: $room) {
            id
            content
            author{
                id
            }
            createdAt
        }
    }
`

const GET_ROOM = gql`
    query GetRoom($roomId: ID!) {
        getRoom(roomId: $roomId) {
            userID1 {
                id
                username
                image
            }
            userID2 {
                id
                username
                image
            }
            
        }
    }
`;

const SEND_MESSAGE = gql`
    mutation Message($content: String!, $author: ID!, $room: ID!) {
        message(content: $content, author: $author, room: $room) {
            id
            content
            createdAt
        }
    }
`

const TEXT_SUBSCRIPTION = gql`
    subscription MessageSent($messageSentRoom2: ID!) {
        messageSent(room: $messageSentRoom2) {
            content
            createdAt
            id
            author {
                id
            }
        }
    }
`;

const Chat = (props: Chat) => {
    const [newMessage, setNewMessage] = useState('');
    const auth = useOutletContext<IProfileShort>();
    const { data, loading } = useQuery<GetMessagesQuery>(GET_MESSAGES, { variables: { room: props.id } })
    const getRoom = useQuery<GetRoomQuery>(GET_ROOM, { variables: { roomId: props.id } })
    const [message] = useMutation(SEND_MESSAGE, { variables: { content: newMessage, author: auth.id, room: props.id } })

    let bottomRef = useRef(null);
    const [texts, setTexts] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleNewMessage = () => {
        message().then((res) => {
            const msg = {
                id: res.data.message.id,
                content: res.data.message.content,
                author: { id: auth.id },
                createdAt: res.data.message.createdAt
            }
            setTexts([...texts, { id: msg.id, content: msg.content, author: msg.author, createdAt: msg.createdAt }]);
            setNewMessage('');
        }).catch((err) => {
            console.log(err)
        });
    }

    const subscription: SubscriptionResult = useSubscription(TEXT_SUBSCRIPTION, {
        onSubscriptionData: (data) => {

            const { id, content, author, createdAt } = data.subscriptionData.data.messageSent
            const test = { id: id, author: { id: author.id }, content: content, createdAt: createdAt }
            console.log(test);
            setTexts((texts) => [...texts, test])
            console.log(texts)
        }, variables: { messageSentRoom2: props.id }
    });

    useEffect(() => {
        if (!loading) {
            setTexts(data?.messages.map(msg => {
                return {
                    id: msg.id,
                    content: msg.content,
                    author: msg.author,
                    createdAt: msg.createdAt
                }
            }))
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [loading, getRoom.loading])
    return (
        <Container p={3} bg='blackAlpha.100' >
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
                <Avatar src={getRoom.data?.getRoom.userID1.id === auth.id ? getRoom.data?.getRoom.userID2.image : getRoom?.data?.getRoom.userID1.image}></Avatar>
                <Text>{auth.id === getRoom?.data?.getRoom.userID1.id ? getRoom?.data?.getRoom.userID2.username : getRoom?.data?.getRoom.userID1.username}</Text>
                {
                    expanded ? (<Center><FaChevronUp onClick={() => setExpanded(false)} /></Center>) : (<Center><FaChevronDown onClick={() => setExpanded(true)} /></Center>)
                }
            </Box>

            {
                expanded && (
                    <Box>
                        <VStack minHeight='200px' flexDirection='column-reverse' maxHeight='200px' overflowY='scroll' css={scrollBarStyle} p={0}>
                            <VStack w='100%' m={0}>


                                {
                                    texts && texts.map((text: any) => (
                                        <TextMessage id={text.id} body={text.content} user={text.author?.id} key={text.id} createdAt={text.createdAt} />
                                    ))
                                }
                                <div ref={(el) => { bottomRef.current = el }}></div>
                            </VStack>
                        </VStack>
                        <Box display='flex' flexDirection='row'>
                            <Input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                            <Button onClick={() => handleNewMessage()}>SEND</Button>
                        </Box>
                    </Box>
                )
            }


        </Container>
    )
}

export default Chat;