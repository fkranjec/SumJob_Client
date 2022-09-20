import { useMutation, useQuery } from '@apollo/client'
import { Text, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddNewJob from '../../../components/ProfileManagementCompany/AddNewJob'
import CompanyDetails from '../../../components/ProfileManagementCompany/CompanyDetails'
import CompanyJobs from '../../../components/ProfileManagementCompany/CompanyJobs'
import { IProfileShort } from '../Dashboard'
import { IProfile } from './Profile'

interface ICompanyProfile {
    values: IProfile
    refetch: () => any
}

const UPDATE_COMPANY = gql`
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

const GET_COMPANY_JOBS = gql`
    query JobsByCompany($userId: ID!){
        jobsByCompany(userId: $userId){
            id
            name
        }
    }
`

const DELETE_JOB = gql`
    mutation deleteJob($jobId: ID!){
        deleteJob(jobId: $jobId)
    }
`


const CompanyProfile = (props: ICompanyProfile) => {
    const { id } = useParams()
    const authContex = useOutletContext<IProfileShort>()
    const { data, loading, refetch } = useQuery(GET_COMPANY_JOBS, { variables: { userId: id } })
    const deleteMutation = useMutation(DELETE_JOB)
    const updateMutation = useMutation(UPDATE_COMPANY)

    const newJob = () => {

    }

    const deleteJob = (jobs: string[]) => {
        jobs.forEach(job => {
            console.log(job)
            deleteMutation["0"]({ variables: { jobId: job } }).then((res) => {
                toast.success("Job post deleted");
            })
        })

    }

    const updateCompany = (variables: any) => {
        console.log(variables)
        updateMutation["0"]({ variables: { userId: id, userInput: variables } }).then(() => props.refetch())
    }

    useEffect(() => {
        console.log(props.values)
    }, [data, loading])

    return (
        <VStack>
            {data && !loading && <CompanyDetails id={id} address={props.values?.getUser?.address} companyInfo={props.values?.getUser?.companyInfo} editable={authContex.id === id} updateCompany={updateCompany} />}
            {data && !loading && <CompanyJobs jobs={[...data?.jobsByCompany]} editable={authContex.id === id} addNewJob={newJob} deleteJob={deleteJob} />}
            {data && !loading && authContex.id === id && <AddNewJob refetch={refetch} />}
        </VStack>
    )
}

export default CompanyProfile