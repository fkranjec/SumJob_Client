import { useMutation, useQuery } from '@apollo/client';
import { Text, VStack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../components/Layout';
import ProfileCard from '../../../components/ProfileCard';
import Education from '../../../components/ProfileManagement/Education';
import Languages from '../../../components/ProfileManagement/Languages';
import PreviousJobs from '../../../components/ProfileManagement/PreviousJobs';
import Skills from '../../../components/ProfileManagement/Skills';
import UserDetails from '../../../components/ProfileManagement/UserDetails';
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

        }
    }
`;



const Profile = () => {
    const { id } = useParams();
    const { loading, data, error, refetch } = useQuery<IProfile>(GET_USER, { variables: { userId: id }, fetchPolicy: 'cache-and-network' });

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
                {data && <UserProfile values={data} refetch={refetch} />}
            </Layout.Mid>
            <Layout.Right>
                <Text>Work in progress</Text>
            </Layout.Right>
        </Layout>
    )
}

export default Profile;