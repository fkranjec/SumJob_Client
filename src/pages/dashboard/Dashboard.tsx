import { Center, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import gql from 'graphql-tag'
import { AuthContext } from '../../store/auth-context'
import { useQuery } from '@apollo/client'
export interface IProfileShort {
    id: string
    username: string
    image: string
    email: string
    address: {
        city: string
        postalCode: string
        state: string
        street: string
        streetNumber: string
    }
    companyInfo: {
        companyName: string
    }
}

const GET_USER = gql`
    query getUser($userId: ID!){
        getUser(userId: $userId) {
            id
            username
            image
            email
            address {
                city
                postalCode
                state
                street
                streetNumber
            }
            companyInfo {
                companyName
            }

        }
    }
`;

const Dashboard = () => {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const [user, setUser] = useState();
    const { data, loading
    } = useQuery(GET_USER, { variables: { userId: auth.user.id } })

    useEffect(() => {
        if (!loading) {
            console.log(auth);
            console.log(data);
            setUser(data)
        }
    }, [loading, data])
    return (
        <VStack>
            <Navigation />
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Center maxW='1600px' w='100%' h='calc(100vh - 70px)' overflowY='hidden' >
                        <Outlet context={data?.getUser} />
                    </Center>
                </CSSTransition>
            </TransitionGroup>
        </VStack>


    )
}

export default Dashboard