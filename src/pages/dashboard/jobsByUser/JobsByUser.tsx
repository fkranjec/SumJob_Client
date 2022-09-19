import React, { FC, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { VStack } from '@chakra-ui/react'
import ProfileCard from '../../../components/Cards/ProfileCard'
import Rooms from '../../../components/Chat/Rooms'
import Layout from '../../../components/Layout'
import { IProfileShort } from '../Dashboard'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import JobNestedCard from '../../../components/Cards/JobNestedCard'

const JOBS_PER_USER = gql`
    query JobsByCompany($userId: ID!) {
        jobsByCompany(userId: $userId){
            name
            applied{
                id
                username
                image
                userInfo{
                    firstName
                    lastName
                }
            }
        }
    }
`

const JobsByUser: FC = () => {
    const authContext = useOutletContext<IProfileShort>()
    const { data, loading, refetch } = useQuery(JOBS_PER_USER, { variables: { userId: authContext.id }, onCompleted: () => { } })
    const [user, setUser] = useState<IProfileShort>();
    const handleRefetch = () => {
        setUser({ ...authContext });
    }
    useEffect(() => {
        setUser({ ...authContext })
    }, [data, refetch, loading])
    return (
        <Layout>
            <Layout.Left>
                <ProfileCard id={authContext.id} userType={authContext.userType} username={authContext?.username} image={authContext.image} />
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    {data?.jobsByCompany.map((job, index) => (
                        <JobNestedCard key={index} job={job} refetch={handleRefetch} />
                    ))}
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                {!loading && user && <Rooms id={user.id} />}
            </Layout.Right>
        </Layout>
    )
}

export default JobsByUser