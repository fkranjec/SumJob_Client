import { Box, Button, Container, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { scrollBarStyle } from '../../utils/styles'
import { PrevJob } from '../../pages/dashboard/profile/Profile'

interface IPreviousJobs {
    editable?: boolean
    selected?: PrevJob[]
    updatePreviousJobs: (variables: any) => void
}

const PreviousJobs = (props: IPreviousJobs) => {
    const { t } = useTranslation('common');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [prevJob, setPrevJob] = useState<PrevJob>({
        title: '',
        companyName: '',
        city: '',
        period: {
            from: 0,
            to: 0
        }
    });
    const [selectedJobs, setSelectedJobs] = useState<PrevJob[]>([]);

    const handleSave = () => {
        props.updatePreviousJobs(selectedJobs);
        onClose();
    }

    const onPrevJobSelected = () => {
        setSelectedJobs([...selectedJobs, prevJob]);
        setPrevJob({
            title: '',
            companyName: '',
            city: '',
            period: {
                from: 0,
                to: 0
            }
        });
    }

    const handleClose = () => {
        setSelectedJobs(props.selected ? props.selected : []);
        onClose();
    }

    useEffect(() => {
        setSelectedJobs(props.selected ? props.selected : []);
    }, [props])
    return (
        <>
            <VStack bg='blackAlpha.200' h='300px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>Previous jobs</Text>
                    {props.editable && <EditIcon onClick={onOpen} />}
                </HStack>
                <HStack w='100%' wrap='wrap' gap='10px' p={10} overflowY='auto' css={scrollBarStyle}>
                    {
                        selectedJobs.map((job, index) => (
                            <Box key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                <Text>{job.title}</Text>
                                <Text>{job.companyName}</Text>
                                <Text>{job.period.from} - {job.period.to}</Text>
                                <Text>{job.city}</Text>
                            </Box>
                        ))
                    }
                </HStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>
                    <ModalHeader>
                        {t('prevJovs')}
                    </ModalHeader>
                    <ModalBody>
                        <VStack>
                            <Input value={prevJob.title} onChange={(e) => setPrevJob({ ...prevJob, title: e.target.value })} placeholder='Insert previous job title'></Input>
                            <Input value={prevJob.companyName} onChange={(e) => setPrevJob({ ...prevJob, companyName: e.target.value })} placeholder='Insert previous company name'></Input>
                            <Input value={prevJob.city} onChange={(e) => setPrevJob({ ...prevJob, city: e.target.value })} placeholder='Insert previous job city'></Input>
                            <HStack w='100%'>
                                <Input type='number' value={prevJob.period.from} onChange={(e) => setPrevJob({ ...prevJob, period: { ...prevJob.period, from: parseInt(e.target.value) } })} placeholder='Insert previous job period from'></Input>
                                <Input type='number' value={prevJob.period.to} onChange={(e) => setPrevJob({ ...prevJob, period: { ...prevJob.period, to: parseInt(e.target.value) } })} placeholder='Insert previous job to'></Input>
                            </HStack>
                            <Button colorScheme='orange' onClick={onPrevJobSelected}>Add</Button>
                        </VStack>

                        <Box>
                            <HStack wrap='wrap' gap='10px' p={10}>
                                {
                                    isOpen && selectedJobs.map((job, index) => (
                                        <Box display='flex' key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                            <VStack>
                                                <Text>{job.title}</Text>
                                                <Text>{job.companyName}</Text>
                                                <Text>{job.period.from} - {job.period.to}</Text>
                                                <Text>{job.city}</Text>
                                            </VStack>

                                            <CloseIcon _hover={{ cursor: "pointer" }} w='10px' m='auto 10px' onClick={() => { setSelectedJobs((jobs) => jobs.filter((lang, idx) => { return idx !== index })) }} />
                                        </Box>
                                    ))
                                }
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

export default PreviousJobs