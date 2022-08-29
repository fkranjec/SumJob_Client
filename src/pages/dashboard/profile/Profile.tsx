import { useQuery } from '@apollo/client';
import { Text, VStack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PreviewImage } from '../../../components/FileInput';
import Layout from '../../../components/Layout';
import ProfileCard from '../../../components/ProfileCard';
import Languages from '../../../components/ProfileManagement/Languages';
import PreviousJobs from '../../../components/ProfileManagement/PreviousJobs';
import Skills from '../../../components/ProfileManagement/Skills';
import UserDetails from '../../../components/ProfileManagement/UserDetails';

export interface IProfile {
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
    userInfo: {
        education: string[]
        languages: string[]
        skills: string[]
        previousJobs: string[]
        firstName: string
        lastName: string
    }
}

const GET_USER = gql`
    query getUser($userId: ID!){
        getUser(userId: $userId) {
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
    const { loading, data, error } = useQuery(GET_USER, { variables: { userId: id } });
    const [userData, setUserData] = useState<IProfile>()
    useEffect(() => {
        if (!loading) {
            setUserData(data?.getUser)
            console.log(data)
        }
    }, [data, loading])
    return (
        <Layout>
            <Layout.Left>
                <ProfileCard id={id} username={data?.getUser.username}></ProfileCard>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    <UserDetails />
                    <PreviousJobs />
                    <Languages title="Languages" editable={true} />
                    <Skills />
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <Text>Work in progress</Text>
            </Layout.Right>
        </Layout>
    )
}

export default Profile;