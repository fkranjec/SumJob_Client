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

const UPDATE_USER = gql`
    mutation UpdateUser($userId: ID!, $userInput: UserInput) {
        updateUser(id: $userId, userInput: $userInput) {
            username
            id
            address {
                city
            }
            companyInfo {
                companyName
            }
        }
    }
`

const UPDATE_LANGUAGES = gql`
    mutation updateLanguages($userId: ID!, $languages: [String]){
        updateLanguages(userId: $userId, languages: $languages)
    }
`

const UPDATE_EDUCATION = gql`
    mutation updateEducation($userId: ID!, $education: [String]){
        updateEducation(userId: $userId, education: $education)
    }
`

const UPDATE_SKILLS = gql`
    mutation updateSkills($userId: ID!, $skills: [String]){
        updateSkills(userId: $userId, skills: $skills)
    }
`

const UPDATE_PREVJOBS = gql`
    mutation updatePrevJobs($userId: ID!, $prevJobs: [String]){
        updatePrevJobs(userId: $userId, prevJobs: $prevJobs)
    }
`

const Profile = () => {
    const { id } = useParams();
    const { loading, data, error } = useQuery<IProfile>(GET_USER, { variables: { userId: id }, fetchPolicy: 'cache-and-network' });
    const updateMutation = useMutation(UPDATE_USER)
    const languagesMutation = useMutation(UPDATE_LANGUAGES)
    const educationMutation = useMutation(UPDATE_EDUCATION)
    const skillsMutation = useMutation(UPDATE_SKILLS)
    const prevJobsMutation = useMutation(UPDATE_PREVJOBS)
    const updateUser = (variables: any) => {
        console.log(variables);
        updateMutation["0"]({ variables: { userId: id, userInput: variables }, refetchQueries: [{ query: GET_USER, variables: { userId: id } }] });
    }

    const updateLanguages = (languages: string[]): void => {
        languagesMutation["0"]({ variables: { userId: id, languages: languages }, refetchQueries: [{ query: GET_USER, variables: { userId: id } }] })
    }

    const updateEducation = (education: string[]): void => {
        educationMutation["0"]({ variables: { userId: id, education: education }, refetchQueries: [{ query: GET_USER, variables: { userId: id } }] })
    }

    const updateSkills = (skills: string[]): void => {
        educationMutation["0"]({ variables: { userId: id, skills: skills }, refetchQueries: [{ query: GET_USER, variables: { userId: id } }] })
    }

    const updatePrevJobs = (prevJobs: string[]): void => {
        prevJobsMutation["0"]({ variables: { userId: id, prevJobs: prevJobs }, refetchQueries: [{ query: GET_USER, variables: { userId: id } }] })
    }


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
                    <Languages selected={data?.getUser.userInfo.languages.map(language => { return language })} title="Languages" updateUser={updateLanguages} editable={true} />
                    <Skills />
                    <Education selected={data?.getUser.userInfo.education.map(edu => { return edu })} title="Education" updateEducation={updateEducation} editable={true} />
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <Text>Work in progress</Text>
            </Layout.Right>
        </Layout>
    )
}

export default Profile;