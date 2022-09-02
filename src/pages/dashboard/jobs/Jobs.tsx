import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../../components/Layout'
import Post from '../../../components/Post'

const Jobs = () => {
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
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Salary
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Location
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Skills
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[1]} allowMultiple w='100%'>
                        <AccordionItem>

                            <AccordionButton w='100%' flex='1'>
                                <Box flex='1' textAlign='left'>
                                    Languages
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Input placeholder='Enter text here'></Input>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Layout.Left>
            <Layout.Mid>
                <VStack>
                    <Post title='test' id='1'></Post>
                    <Post title='test' id='1'></Post>
                    <Post title='test' id='1'></Post>
                    <Post title='test' id='1'></Post>
                </VStack>
            </Layout.Mid>
            <Layout.Right>
                <Center h='100%' bg='tomato' w='100%'>
                    JOB PREVIEW
                </Center>
            </Layout.Right>
        </Layout>
    )
}

export default Jobs