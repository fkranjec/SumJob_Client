import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { AuthContext } from '../../store/auth-context'
import { toast } from 'react-toastify'
import PersonalDetails, { IPersonalDetails } from './PersonalDetails'
import UserDetails, { IUserDetails } from './UserDetails'

interface Register {
    step?: number
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    firstName?: string
    lastName?: string
    image?: string
    languages?: string[]
}

const REGISTER = gql`
    mutation register($registerInput:RegisterInput!){
        register(registerInput:$registerInput) {
            token
            username
            id
        }
    } 
`;

const Register: React.FunctionComponent<Register> = () => {
    const authContext = React.useContext(AuthContext);
    const [register, setRegister] = useState<Register>({
        step: 1,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        image: '',
        languages: []
    });
    const [registerUser, { loading }] = useMutation(REGISTER, {
        update(_, result) {
            console.log(result)
            const { token } = result.data.register;
            authContext.register(token);
            toast.success("Registration Successful");
        },
        onError(err) {
            console.log(err.graphQLErrors)
            if (err.graphQLErrors[0]) {
                if (err.graphQLErrors[0].extensions.errors.username) {
                    toast.error(err.graphQLErrors[0].extensions.errors.username);
                }
                if (err.graphQLErrors[0].extensions.errors.email) {
                    toast.error(err.graphQLErrors[0].extensions.errors.email);
                }
                if (err.graphQLErrors[0].extensions.errors.password) {
                    toast.error(err.graphQLErrors[0].extensions.errors.password)
                }
                if (err.graphQLErrors[0].extensions.errors.confirmPassword) {
                    toast.error(err.graphQLErrors[0].extensions.errors.confirmPassword)
                }
            }
        },
        variables: { registerInput: { username: register.username, password: register.password, confirmPassword: register.confirmPassword, email: register.email } }
    });

    const handleChange = (input: string) => (e: any) => {
        setRegister({ ...register, [input]: e.target.value });
    }

    const nextStep = () => {
        setRegister({ ...register, step: register.step + 1 });
    }


    const previousStep = () => {
        setRegister({ ...register, step: register.step - 1 });
    }

    const handleRegister = () => {
        registerUser();
    }
    switch (register.step) {
        case 1: return (
            <>
                <UserDetails handleChange={handleChange} nextStep={nextStep} values={register2UserDetails(register)} />
            </>

        )
        case 2: return (
            <>
                <PersonalDetails handleChange={handleChange} nextStep={nextStep} prevStep={previousStep} register={handleRegister} values={register2PersonalDetails(register)} />
            </>
        )
        default: return (<PersonalDetails handleChange={handleChange} nextStep={nextStep} prevStep={previousStep} register={handleRegister} values={register2PersonalDetails(register)} />)
    }
}

const register2UserDetails = (register: Register): IUserDetails => {
    return {
        username: register.username,
        firstName: register.firstName,
        lastName: register.lastName,
        password: register.password,
        email: register.email,
        confirmPassword: register.confirmPassword
    }
}

const register2PersonalDetails = (register: Register): IPersonalDetails => {
    return {

    }
}



export default Register;