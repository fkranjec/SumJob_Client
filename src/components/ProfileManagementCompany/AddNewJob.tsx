import { EditIcon } from '@chakra-ui/icons'
import { Box, HStack, VStack, Text, Input, Textarea, Select, Divider, Heading, NumberInput, Button } from '@chakra-ui/react'
import React from 'react'

interface INewJob {

}

const AddNewJob = (props: INewJob) => {
    return (
        <VStack bg='blackAlpha.200' h='100%' borderRadius='20px' w='100%'>
            <HStack p='3' w='100%' bg='blackAlpha.200' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                <Text>Add new Job</Text>
            </HStack>
            <HStack wrap='wrap' gap='10px' p={10}>
                <Text>Job name</Text>
                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Input>
                <Divider />
                <Heading fontSize='xl'>Content</Heading>
                <Divider />
                <Text>Title</Text>
                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Input>
                <Text>Body</Text>
                <Textarea color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Textarea>
                <Text>Footer</Text>
                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Input>
                <Text>Salary</Text>
                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Input>
                <Text>Workers needed</Text>
                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }}></Input>

                <Button w='100%' ml='100%' colorScheme='orange'>Save</Button>
            </HStack>
        </VStack >
    )
}

export default AddNewJob