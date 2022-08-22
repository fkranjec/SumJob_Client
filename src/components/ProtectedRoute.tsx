import React, { Component } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthConsumer } from '../store/auth-context'

const ProtectedRoute = (props: any) => {
    return (
        <AuthConsumer>
            {({ isLoggedIn }) => (

                isLoggedIn ?
                    props.children
                    :
                    <Navigate to="/login" />
            )}
        </AuthConsumer>
    )
}

export default ProtectedRoute