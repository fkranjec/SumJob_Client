import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { Suspense, useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import Rooms from '../../../components/Chat/Rooms';
import Layout from '../../../components/Layout';
import ProfileCard from '../../../components/ProfileCard';
import { IProfileShort } from '../Dashboard';
import CompanyProfile from './CompanyProfile';
import UserProfile from './UserProfile';

export interface IProfile {
    getUser: {
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
        userInfo?: {
            education: string[]
            languages: string[]
            skills: string[]
            previousJobs: string[]
            firstName: string
            lastName: string
        },
        companyInfo?: {
            companyName: string
            numberOfEmployees: string
            description: string
            typeOfCompany: string
        }
    }

}

export const GET_USER = gql`
    query getUser($userId: ID!){
        getUser(userId: $userId) {
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
            userInfo {
                education
                languages
                skills
                previousJobs
                firstName
                lastName
            }
            companyInfo{
                description
                numberOfEmployees
                typeOfCompany
                companyName
            }

        }
    }
`;



const Profile = () => {
    const { id } = useParams();
    const { loading, data, error, refetch } = useQuery<IProfile>(GET_USER, { variables: { userId: id }, fetchPolicy: 'no-cache' });
    const authContext = useOutletContext<IProfileShort>()
    useEffect(() => {
        if (!loading) {
            console.log(data)

        }
    }, [data, loading])

    return (
        <Layout>
            <Layout.Left>
                <ProfileCard id={id} username={data?.getUser.username} image={data?.getUser.image} userType={data?.getUser.userType}></ProfileCard>
            </Layout.Left>
            <Layout.Mid>
                {data && data.getUser.userType === 'USER' && <UserProfile values={data} refetch={refetch} />}
                {data && data.getUser.userType === 'COMPANY' && <CompanyProfile values={data} refetch={refetch} />}
            </Layout.Mid>
            <Layout.Right>
                <Suspense fallback={<Spinner></Spinner>}>
                    <Rooms id={authContext?.id} />
                </Suspense>
            </Layout.Right>
        </Layout>
    )
}

export default Profile;