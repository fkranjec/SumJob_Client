import { Button, Center, CloseButton, Container, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { AuthContext, AuthConsumer } from '../../store/auth-context';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import loginImg from '../../assets/login.jpg';

const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
            username
            id
        }
    }
`

const Login = () => {
    const { t } = useTranslation('common');
    const [user, setUser] = useState({ username: "", password: "" });
    const [show, setShow] = useState(false);
    const [loginUser, { loading }] = useMutation(LOGIN, {
        variables: { username: user.username, password: user.password }, onCompleted: (res) => {
            console.log(res)
            const { token } = res.login;
            authContext.login(token);
            toast.success("Login Successful");
        }
    })
    const authContext = React.useContext(AuthContext);

    const handleLogin = () => {
        loginUser();
    }
    useEffect(() => {
    }, [])
    return (
        <Center width='100%' bg='white' bgSize='cover' height='100vh'>
            <Container boxShadow='dark-lg' p='0' bg='rgba(255,255,255, 0.6)' maxW='1200px' h='800px' borderRadius='10px'>

                <HStack height='100%' p='0px' w='100%' m='0px'>
                    <Container overflow='hidden' flex='0 0 50%' p='0' borderLeftRadius='10px' h='800px' w='100%' m='0px'>
                        <Container overflow='hidden' p='0' m='0' position='relative' transform='scale(1,1)' transition='all 0.3s ease-out' _hover={{ transform: 'scale(1.1,1.1)', transition: 'all 0.3s ease-in-out' }} width='100%' bgImage={loginImg} h='800px' bgSize='cover' bgPosition='center'></Container>
                    </Container>
                    <VStack flex='1 0 50%' h='100%' p={20} position='relative'>
                        <CloseButton position='absolute' top='10px' right='10px' />
                        <Heading fontFamily=''>{t('login')}</Heading>
                        <Input borderColor='grey' focusBorderColor='black' placeholder='Username' color='black' _placeholder={{ color: 'inherit' }} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />

                        <InputGroup size='md'>
                            <Input
                                borderColor='gray'
                                focusBorderColor='black'
                                color='black'
                                type={show ? 'text' : 'password'}
                                _placeholder={{ color: 'inherit' }}
                                placeholder='Password'
                                value={user.password}
                                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button colorScheme='orange' h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button colorScheme='orange' isLoading={loading} onClick={() => handleLogin()}>{t('login')}</Button>
                        <Text _hover={{ cursor: "pointer", color: 'orange.500' }} onClick={() => { console.log("Change password") }} fontSize='sm' textDecor='underline'>Forgotten password?</Text>
                    </VStack>
                </HStack>
            </Container>
        </Center>
    )
}



export default Login
