import { useMutation } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { IProfileShort } from '../../../components/Cards/ProfileCard'
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
    mutation updateEducation($userId: ID!, $education: [EducationInput]){
        updateEducation(userId: $userId, education: $education)
    }
`

const UPDATE_SKILLS = gql`
    mutation updateSkills($userId: ID!, $skills: [String]){
        updateSkills(userId: $userId, skills: $skills)
    }
`

const UPDATE_PREVJOBS = gql`
    mutation updatePrevJobs($userId: ID!, $prevJobs: [PreviousJobsInput]){
        updatePrevJobs(userId: $userId, prevJobs: $prevJobs)
    }
`

const UserProfile = (props: IUserProfile) => {
    const { id } = useParams();
    const authContext = useOutletContext<IProfileShort>();
    const updateMutation = useMutation(UPDATE_USER)
    const languagesMutation = useMutation(UPDATE_LANGUAGES)
    const educationMutation = useMutation(UPDATE_EDUCATION)
    const skillsMutation = useMutation(UPDATE_SKILLS)
    const prevJobsMutation = useMutation(UPDATE_PREVJOBS)

    const updateUser = (variables: any) => {
        console.log(variables)
        updateMutation["0"]({ variables: { userId: id, userInput: variables } }).then(() => props.refetch());
    }

    const updateLanguages = (languages: string[]): void => {
        languagesMutation["0"]({ variables: { userId: id, languages: languages } }).then(() => props.refetch());
    }

    const updateEducation = (education: string[]): void => {
        console.log(education);
        educationMutation["0"]({ variables: { userId: id, education: education } }).then(() => props.refetch());
    }

    const updateSkills = (skills: string[]): void => {
        skillsMutation["0"]({ variables: { userId: id, skills: skills } }).then(() => props.refetch());
    }

    const updatePrevJobs = (prevJobs: string[]): void => {
        prevJobsMutation["0"]({ variables: { userId: id, prevJobs: prevJobs } }).then(() => props.refetch());
    }

    return (
        <VStack>
            <UserDetails updateUser={updateUser} id={id} editable={authContext.id === id} username={props.values.getUser.username} userInfo={{ ...props.values.getUser.userInfo }} address={{ ...props.values.getUser.address }} image={props.values.getUser.image} />
            <Education editable={authContext.id === id} selected={props.values.getUser.userInfo.education.map(edu => { return edu })} title="Education" updateEducation={updateEducation} />
            <PreviousJobs editable={authContext.id === id} selected={props.values.getUser.userInfo.previousJobs.map(job => { return job })} updatePreviousJobs={updatePrevJobs} />
            <Languages editable={authContext.id === id} selected={props.values.getUser.userInfo.languages.map(language => { return language })} title="Languages" updateUser={updateLanguages} />
            <Skills editable={authContext.id === id} selected={props.values.getUser.userInfo.skills.map(skill => { return skill })} updateSkills={updateSkills} />

        </VStack>
    )
}

export default UserProfile