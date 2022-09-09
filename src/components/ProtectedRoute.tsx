import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthConsumer } from '../store/auth-context'

const ProtectedRoute = (props: any) => {
    return (
        <AuthConsumer>
            {({ isLoggedIn }) => (

                isLoggedIn ?
                    props.children
                    :
                    <Navigate to="/landing" />
            )}
        </AuthConsumer>
    )
}

export default ProtectedRoute