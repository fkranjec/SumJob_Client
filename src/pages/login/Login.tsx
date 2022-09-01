import { Button, Center, Container, Heading, Input, InputGroup, InputLeftElement, InputRightAddon, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { AuthContext, AuthConsumer } from '../../store/auth-context';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

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
    const [user, setUser] = useState({ username: "", password: "" });
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
        <Center width='100%' bg='blackAlpha.200' height='100vh'>
            <Container bg='blackAlpha.400' maxW='1200px' h='800px' borderRadius='10px'>
                <Center height='100%'>
                    <VStack>
                        <Heading>Login</Heading>
                        <Input onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />

                        <Input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                        <Button isLoading={loading} onClick={() => handleLogin()}>Login</Button>
                    </VStack>
                </Center>
            </Container>
        </Center>
    )
}



export default Login
