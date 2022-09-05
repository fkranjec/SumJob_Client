import { useQuery } from '@apollo/client'
import { Text, VStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import AddNewJob from '../../../components/ProfileManagementCompany/AddNewJob'
import CompanyDetails from '../../../components/ProfileManagementCompany/CompanyDetails'
import CompanyJobs from '../../../components/ProfileManagementCompany/CompanyJobs'
import { IProfileShort } from '../Dashboard'
import { IProfile } from './Profile'

interface ICompanyProfile {
    values: IProfile
    refetch: () => any
}

const GET_COMPANY_JOBS = gql`
    query JobsByCompany($userId: ID!){
        jobsByCompany(userId: $userId){
            id
            name
        }
    }
`


const CompanyProfile = (props: ICompanyProfile) => {
    const { id } = useParams()
    const authContex = useOutletContext<IProfileShort>()
    const { data, loading } = useQuery(GET_COMPANY_JOBS, { variables: { userId: id } })

    const newJob = () => {

    }

    const deleteJob = () => {

    }

    const updateCompany = () => {

    }

    useEffect(() => {
        console.log(data)
    }, [data, loading])

    return (
        <VStack>
            {data && <CompanyDetails values={{ ...props.values }} editable={authContex.id !== id} updateCompany={updateCompany} />}
            {data && <CompanyJobs jobs={[...data?.jobsByCompany]} editable={authContex.id !== id} addNewJob={newJob} deleteJob={deleteJob} />}
            {data && authContex.id !== id && <AddNewJob />}
        </VStack>
    )
}

export default CompanyProfile