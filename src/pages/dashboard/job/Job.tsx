import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';
import ProfileCard from '../../../components/ProfileCard';

const GET_JOB = gql`
    query getJob($jobId: ID!){
        getJob(jobId: $jobId) {
            id
            name
            skills
            averageSalary
            usersApplied
            description
            timeCreated
            period {
                from
                to
            }
            company {
                address {
                    city
                    postalCode
                    streetNumber
                    street
                    state
                }
                companyInfo {
                    companyName
                    description
                    numberOfEmployees
                    typeOfCompany
                }
            }
        }
    }
`

const Job = () => {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_JOB, { variables: { jobId: id } })
    useEffect(() => {
        console.log(data)
    }, [loading])
    return (
        <Layout>
            <Layout.Left>
                <ProfileCard />
            </Layout.Left>
        </Layout>
    )
}

export default Job