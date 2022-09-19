import { useQuery } from '@apollo/client'
import { VStack, Accordion, Box, Text, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Input, Center } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer'
import CompanyCard from '../../../components/Cards/CompanyCard'
import Layout from '../../../components/Layout'

const GET_COMPANIES = gql`
    query getCompanies($offset: Int!, $limit: Int!, $filters: FilterInput){
        getCompanies(offset: $offset, limit: $limit, filters: $filters){
            totalCount
            companies{
                id
                username
                image
                companyInfo{
                  description
                  numberOfEmployees
                  typeOfCompany
                  companyName
                }
            }
        }
    }
`;

interface CompaniesResponse {
    getCompanies: {
        companies: any[]
        totalCount: number
    }

}

const Companies = () => {
    let limit = 3;
    let offset = 0;
    let changed: boolean = false;
    const [companies, setCompanies] = useState([]);
    const [filter, setFilter] = useState({
        text: ''
    })

    const { loading, data, fetchMore, error } = useQuery<CompaniesResponse>(GET_COMPANIES, {
        variables: { offset: offset, limit: limit, filters: filter }, fetchPolicy: 'no-cache', onCompleted(res) {
            console.log(filter)
            setCompanies(res.getCompanies.companies)
        },
    });
    return (
        <Layout>
            <Layout.Left>
                <VStack width='100%'>
                    <Text>Filters</Text>
                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Text search
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input value={filter.text} onChange={(e) => setFilter({ ...filter, text: e.target.value })} placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    {
                        !loading && companies?.length !== 0 && companies?.map((company: any) => (
                            <CompanyCard companyName={company.companyInfo.companyName} image={company.image} numberOfEmployees={company.companyInfo.numberOfEmployees} typeOfCompany={company.companyInfo.typeOfCompany} id={company.id} description={company.companyInfo.description} key={company.id} />
                        ))
                    }
                    {
                        !loading && companies?.length !== 0 && (
                            <InView
                                onChange={async (inView) => {
                                    if (limit < data?.getCompanies.totalCount) {
                                        limit += limit;
                                    } else {
                                        limit = data?.getCompanies.totalCount
                                    }
                                    if (inView) {
                                        const { data, error } = await fetchMore({
                                            variables: {
                                                offset: offset,
                                                limit: limit
                                            }
                                        })
                                        if (companies.length < data.getCompanies.totalCount) {
                                            console.log("UNUTAR IF")
                                            setCompanies([...data?.getCompanies.companies])
                                        }
                                    }
                                }}
                            ></InView>
                        )
                    }
                </VStack>
            </Layout.Mid>
        </Layout>
    )
}

export default Companies