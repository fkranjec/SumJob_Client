import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { AuthContext } from '../../store/auth-context'
import { toast } from 'react-toastify'
import CompanyDetails, { ICompanyDetails } from './CompanyDetails'
import CompanyDescDetails, { ICompanyDesc } from './CompanyDescDetails'


interface Register {
    step?: number
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    image?: string
    description?: string
    typeOfCompany?: string
    numberOfEmployees?: string
    userType?: string,
    companyName?: string
    address?: {
        city: string,
        street: string,
        streetNumber: string,
        postalCode: number,
        latlng: {
            lat: number,
            lng: number
        }
        state: string
    }
}

const REGISTER = gql`
    mutation register($registerInput:RegisterInput!){
        registerCompany(registerInput:$registerInput) {
            token
            username
            id
        }
    } 
`;

const RegisterCompany: React.FunctionComponent<Register> = () => {
    const authContext = React.useContext(AuthContext);
    const [register, setRegister] = useState<Register>({
        step: 1,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
        description: '',
        userType: 'COMPANY',
        numberOfEmployees: '',
        typeOfCompany: '',
        companyName: '',
        address: {
            city: '',
            street: '',
            streetNumber: '',
            postalCode: 0,
            latlng: {
                lat: 0,
                lng: 0
            },
            state: ''
        }
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
        variables: { registerInput: { username: register.username, password: register.password, confirmPassword: register.confirmPassword, email: register.email, companyInfo: { companyName: register.username, numberOfEmployees: register.numberOfEmployees, description: register.description, typeOfCompany: register.typeOfCompany }, address: { ...register.address } } }
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
                <CompanyDetails handleChange={handleChange} nextStep={nextStep} values={register2CompanyDetails(register)} />
            </>

        )
        case 2: return (
            <>
                <CompanyDescDetails values={register2CompanyDesc(register)} handleChange={handleChange} prevStep={previousStep} register={handleRegister} />
            </>
        )
        default: return (<CompanyDescDetails values={register2CompanyDesc(register)} handleChange={handleChange} prevStep={previousStep} register={handleRegister} />)
    }
}

const register2CompanyDetails = (register: Register): ICompanyDetails => {
    return {
        username: register.username,
        password: register.password,
        email: register.email,
        confirmPassword: register.confirmPassword
    }
}

const register2CompanyDesc = (register: Register): ICompanyDesc => {
    return {
        description: register.description,
        address: { ...register.address },
        typeOfCompany: register.typeOfCompany,
        numberOfEmployees: register.numberOfEmployees
    }
}



export default RegisterCompany;