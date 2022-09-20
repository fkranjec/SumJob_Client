import { EditIcon } from '@chakra-ui/icons'
import { VStack, Text, Box, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Select, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import { LoadScriptNext } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ICompanyJobs {
    jobs: any[]
    editable: boolean
    addNewJob: (variables: any) => void
    deleteJob: (variables: any) => void
}


const CompanyJobs = (props: ICompanyJobs) => {
    const { t } = useTranslation('common');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState();
    const [jobsToDelete, setJobsToDelete] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSave = () => {
        console.log(jobsToDelete)
        props.deleteJob(jobsToDelete);
        onClose();
    }

    const handleDelete = (index, id) => {
        setJobs((jobs) => jobs.filter((lang, idx) => { return idx !== index }));
        console.log(id);
        setJobsToDelete([...jobsToDelete, id])
        console.log(jobsToDelete)
    }

    const handleOpen = async () => {
        onOpen();
    }

    const handleClose = () => {

        onClose()
    }
    useEffect(() => {
        setJobs(props.jobs ? props.jobs : [])
    }, [props])

    return (
        <>
            <VStack bg='blackAlpha.200' minH='300px' h='fit-content' borderRadius='20px' w='100%' >
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>Jobs</Text>
                    {props.editable && <EditIcon onClick={handleOpen} />}
                </HStack>
                <HStack wrap='wrap' p={10} gap='10px' justifyContent='flex-start'>
                    {jobs && jobs.map((job) => (
                        <Button key={job.id} ml='8px' p='20px' w='fit-content' flex='1 1 30%' colorScheme='orange' onClick={() => navigate('/dashboard/job/' + job.id)}>{job.name}</Button>
                    ))}
                </HStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>
                    <ModalHeader>
                        Jobs
                    </ModalHeader>
                    <ModalBody>
                        <Box>
                            <HStack wrap='wrap' p={10} gap='10px' justifyContent='flex-start'>
                                {jobs && jobs.map((job, index) => (
                                    <Button key={job.id} ml='8px' p='0px' w='100%' flex='1 1 25%' colorScheme='orange' onClick={() => handleDelete(index, job.id)}>{job.name}</Button>
                                ))}
                            </HStack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose}>{t('modal.close')}</Button>
                        <Button onClick={handleSave}>{t('modal.save')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CompanyJobs;