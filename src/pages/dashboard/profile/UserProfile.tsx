import { useMutation } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React from 'react'
import { useParams } from 'react-router-dom'
import Education from '../../../components/ProfileManagement/Education'
import Languages from '../../../components/ProfileManagement/Languages'
import PreviousJobs from '../../../components/ProfileManagement/PreviousJobs'
import Skills from '../../../components/ProfileManagement/Skills'
import UserDetails from '../../../components/ProfileManagement/UserDetails'
import { IProfile } from './Profile'

interface IUserProfile {
    values: IProfile
    refetch: () => any;
}

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

const UserProfile = (props: IUserProfile) => {
    const { id } = useParams();
    const updateMutation = useMutation(UPDATE_USER)
    const languagesMutation = useMutation(UPDATE_LANGUAGES)
    const educationMutation = useMutation(UPDATE_EDUCATION)
    const skillsMutation = useMutation(UPDATE_SKILLS)
    const prevJobsMutation = useMutation(UPDATE_PREVJOBS)

    const updateUser = (variables: any) => {
        console.log(variables);
        updateMutation["0"]({ variables: { userId: id, userInput: variables } });
        props.refetch();
    }

    const updateLanguages = (languages: string[]): void => {
        languagesMutation["0"]({ variables: { userId: id, languages: languages } })
        props.refetch();
    }

    const updateEducation = (education: string[]): void => {
        educationMutation["0"]({ variables: { userId: id, education: education } })
        props.refetch();
    }

    const updateSkills = (skills: string[]): void => {
        educationMutation["0"]({ variables: { userId: id, skills: skills } })
        props.refetch();
    }

    const updatePrevJobs = (prevJobs: string[]): void => {
        prevJobsMutation["0"]({ variables: { userId: id, prevJobs: prevJobs } })
        props.refetch();
    }

    return (
        <VStack>
            <UserDetails id={id} username={props.values.getUser.username} firstName={props.values.getUser.userInfo.firstName} lastName={props.values.getUser.userInfo.lastName} address={{ ...props.values.getUser.address }} image={props.values.getUser.image} />
            <PreviousJobs />
            <Languages selected={props.values.getUser.userInfo.languages.map(language => { return language })} title="Languages" updateUser={updateLanguages} editable={true} />
            <Skills />
            <Education selected={props.values.getUser.userInfo.education.map(edu => { return edu })} title="Education" updateEducation={updateEducation} editable={true} />
        </VStack>
    )
}

export default UserProfile