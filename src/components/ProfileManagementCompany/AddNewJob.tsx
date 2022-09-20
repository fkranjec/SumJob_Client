import { useMutation } from '@apollo/client'
import { EditIcon } from '@chakra-ui/icons'
import { Box, HStack, VStack, Text, Input, Textarea, Select, Divider, Heading, NumberInput, Button, Slider, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IProfileShort } from '../../pages/dashboard/Dashboard'

interface INewJob {
    refetch: () => any
}

interface JobInput {
    name: string
    content: {
        title: string
        body: string
        footer: string
    }
    company: string
    averageSalary: {
        from: number
        to: number
    }
    occupation: string
    skills: string[]
    validTo: Date
    workersNeeded: number
    period: {
        from: Date
        to: Date
    }
}

const jobMock: JobInput = {
    name: '',
    content: {
        title: '',
        body: '',
        footer: ''
    },
    company: '',
    averageSalary: {
        from: 5000,
        to: 8000
    },
    occupation: '',
    skills: [],
    validTo: new Date(),
    workersNeeded: 0,
    period: {
        from: new Date(),
        to: new Date()
    }
}

const NEW_JOB = gql`
    mutation createJob($job: JobInput!){
        createJob(job: $job){
            id
        }
    }
`

const AddNewJob = (props: INewJob) => {
    const [job, setJob] = useState<JobInput>(jobMock);
    const authContext = useOutletContext<IProfileShort>();
    const [newJob, { data, loading }] = useMutation(NEW_JOB, { variables: { job: { ...job, company: authContext.id } } })

    const handleSave = () => {
        newJob().then(res => {
            setJob({ ...jobMock });
            toast.success("Job posted")
            props.refetch();
        });

    }
    return (
        <VStack bg='blackAlpha.200' h='100%' borderRadius='20px' w='100%'>
            <HStack p='3' w='100%' bg='blackAlpha.200' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                <Text>Add new Job</Text>
            </HStack>
            <HStack wrap='wrap' gap='10px' p={10}>
                <Text fontWeight='bold'>Job name</Text>
                <Input color='black' value={job.name} onChange={(e) => setJob({ ...job, name: e.target.value })} borderColor='grey' _placeholder={{ color: 'grey' }}></Input>
                <Divider />
                <Heading fontSize='xl'>Content</Heading>
                <Divider />
                <Text fontWeight='bold'>Title</Text>
                <Input color='black' value={job.content.title} borderColor='grey' onChange={(e) => setJob({ ...job, content: { ...job.content, title: e.target.value } })} _placeholder={{ color: 'grey' }}></Input>
                <Text fontWeight='bold'>Body</Text>
                <Textarea color='black' value={job.content.body} borderColor='grey' onChange={(e) => setJob({ ...job, content: { ...job.content, body: e.target.value } })} _placeholder={{ color: 'grey' }}></Textarea>
                <Text fontWeight='bold'>Footer</Text>
                <Input color='black' value={job.content.footer} borderColor='grey' onChange={(e) => setJob({ ...job, content: { ...job.content, footer: e.target.value } })} _placeholder={{ color: 'grey' }}></Input>
                <Box>
                    <Text fontWeight='bold'>Salary</Text>
                </Box>
                <HStack>
                    <Text><b>From:</b> {job.averageSalary.from}</Text>
                    <Text><b>To:</b> {job.averageSalary.to}</Text>
                </HStack>
                <RangeSlider
                    min={3000}
                    max={30000}
                    step={1000}
                    aria-label={['min', 'max']}
                    colorScheme='orange'
                    defaultValue={[job.averageSalary.from, job.averageSalary.to]}
                    onChangeEnd={(val) => setJob({ ...job, averageSalary: { from: val[0], to: val[1] } })}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                <Text><b>Workers needed</b></Text>
                <Input type='number' value={job.workersNeeded} color='black' borderColor='grey' onChange={(e) => setJob({ ...job, workersNeeded: parseInt(e.target.value) })} _placeholder={{ color: 'grey' }}></Input>
                <Text><b>Occupation</b></Text>
                <Input color='black' value={job.occupation} borderColor='grey' onChange={(e) => setJob({ ...job, occupation: e.target.value })} _placeholder={{ color: 'grey' }}></Input>
                <Text><b>Date from</b></Text>
                <Input color='black' borderColor='grey' onChange={(e) => setJob({ ...job, period: { ...job.period, from: new Date(e.target.value) } })} _placeholder={{ color: 'grey' }} type='date'></Input>
                <Text><b>Date to</b></Text>
                <Input color='black' borderColor='grey' onChange={(e) => setJob({ ...job, period: { ...job.period, to: new Date(e.target.value) } })} _placeholder={{ color: 'grey' }} type='date'></Input>
                <Text><b>Valid to</b></Text>
                <Input color='black' borderColor='grey' onChange={(e) => setJob({ ...job, validTo: new Date(e.target.value) })} _placeholder={{ color: 'grey' }} type='date'></Input>
                <Button w='100%' ml='100%' onClick={() => handleSave()} colorScheme='orange'>Save</Button>
            </HStack>
        </VStack >
    )
}

export default AddNewJob