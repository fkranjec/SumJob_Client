import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserNestedCard from './UserNestedCard'

interface IJobNestedCard {
    job: any,
    refetch: () => any
}

const JobNestedCard = (props: IJobNestedCard) => {

    return (
        <Accordion defaultIndex={[1]} allowMultiple w='100%' borderRadius='10px'>
            <AccordionItem w='100%' justifyContent='space-between' borderTopRadius='10px' >
                <AccordionButton borderTopRadius='10px' display='flex' bg='orange' _hover={{ bg: 'orange.200' }} justifyContent='space-between' p={5} w='100%'>
                    {props.job.name}
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel w='100%' bg=''>
                    <VStack>
                        {props.job.applied.length === 0 && <Text>No applied users</Text>}
                        {props.job.applied.map((user, index) => (
                            <UserNestedCard key={index} user={user} refetch={props.refetch} />
                        ))}
                    </VStack>

                </AccordionPanel>
            </AccordionItem>
        </Accordion>

    )
}

export default JobNestedCard