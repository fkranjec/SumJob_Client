import { useQuery } from '@apollo/client';
import { Text, VStack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../components/Layout';
import ProfileCard from '../../../components/ProfileCard';
import Languages from '../../../components/ProfileManagement/Languages';
import PreviousJobs from '../../../components/ProfileManagement/PreviousJobs';
import Skills from '../../../components/ProfileManagement/Skills';
import UserDetails from '../../../components/ProfileManagement/UserDetails';

export interface IProfile {
    getUser: {
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

}

export const GET_USER = gql`
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
    const { loading, data, error } = useQuery<IProfile>(GET_USER, { variables: { userId: id } });
    useEffect(() => {
        if (!loading) {
            console.log(data)
        }
    }, [data, loading])
    return (
        <Layout>
            <Layout.Left>
                <ProfileCard id={id} username={data?.getUser.username} image={data?.getUser.image}></ProfileCard>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    <UserDetails id={id} username={data?.getUser.username} firstName={data?.getUser.userInfo.firstName} lastName={data?.getUser.userInfo.lastName} address={{ ...data?.getUser.address }} image={data?.getUser.image} />
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