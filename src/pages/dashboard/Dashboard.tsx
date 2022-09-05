import { Center, Spinner, VStack } from '@chakra-ui/react'
import React, { lazy, useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import gql from 'graphql-tag'
import { AuthContext } from '../../store/auth-context'
import { useQuery, useSubscription } from '@apollo/client'
import { toast } from 'react-toastify'
import { scrollBarStyle } from '../../utils/styles'

const Navigation = lazy(() => import('../../components/Navigation'))
export interface IProfileShort {
    id: string
    username: string
    image: string
    email: string
    userType: string
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
            userType
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

const NOTIFICATION = gql`
    subscription UserApplied($userId: ID!) {
        userApplied(userId: $userId) {
            user{
                username
            }
            job {
                name
            }
        }
    }
`

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1)
}

const Dashboard = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const forceUpdate = useForceUpdate();
    const { loading, data, error } = useQuery(GET_USER, {
        onCompleted: () => { console.log("gotovo"); forceUpdate() },
        variables: { userId: user.id }
    })
    const subscription = useSubscription(NOTIFICATION, {
        onSubscriptionData: (data) => {
            console.log("test");
            toast.info(`${data.subscriptionData.data.userApplied.user.username} applied to ${data.subscriptionData.data.userApplied.job.name}`)
        },
        variables: { userId: data?.getUser.id }
    })



    useEffect(() => {
    }, [data?.getUser])
    return (
        <div>
            {!data && <Center h='100vh'><Spinner></Spinner></Center>}
            {data && (
                <VStack overflowY='hidden' css={scrollBarStyle}>
                    <Navigation userType={data?.getUser.userType} id={data?.getUser.id} image={data?.getUser.image} />
                    <TransitionGroup component={null}>
                        <CSSTransition key={location.key} classNames="fade" timeout={300}>
                            <Center maxW='1600px' w='100%' h='calc(100vh - 70px)' css={scrollBarStyle}>
                                <Outlet context={data?.getUser} />
                            </Center>
                        </CSSTransition>
                    </TransitionGroup>
                </VStack >
            )
            }
        </div>
    )
}

export default Dashboard