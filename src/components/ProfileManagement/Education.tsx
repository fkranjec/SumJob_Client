import { Box, Button, Container, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { scrollBarStyle } from '../../utils/styles'
import { Education as IEdu } from '../../pages/dashboard/profile/Profile'
interface IEducation {
    title: string
    editable: boolean
    selected?: IEdu[]
    updateEducation: (variables: any) => void
}



const Education = (props: IEducation) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [education, setEducation] = useState<IEdu>({
        name: '',
        period: {
            from: 0,
            to: 0
        },
        occupation: ''
    })
    const [selectedEducation, setSelectedEducation] = useState<IEdu[]>([]);
    const handleSave = () => {
        props.updateEducation(selectedEducation);
        onClose();
    }

    const onEducationSelected = () => {
        setSelectedEducation([...selectedEducation, education])
        setEducation({
            name: '',
            period: {
                from: 0,
                to: 0
            },
            occupation: ''
        });
    }

    const handleOpen = async () => {
        onOpen();

    }

    const handleClose = () => {
        setSelectedEducation(props.selected ? props.selected : []);
        onClose();
    }

    useEffect(() => {
        setSelectedEducation(props.selected ? props.selected : [])
    }, [props])
    return (
        <>
            <VStack bg='blackAlpha.200' h='300px' borderRadius='20px' w='100%' >
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>{props.title}</Text>
                    {props.editable && <EditIcon onClick={handleOpen} />}
                </HStack>
                <HStack w='100%' wrap='wrap' gap='10px' p={10} overflowY='auto' css={scrollBarStyle}>
                    {
                        selectedEducation.map((education, index) => (
                            <Box key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                <Text>{education.name}</Text>
                                <Text>{education.occupation}</Text>
                                <Text>{education.period.from} - {education.period.to}</Text>
                            </Box>
                        ))
                    }
                </HStack>

            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>
                    <ModalHeader>
                        {t('education')}
                    </ModalHeader>
                    <ModalBody>
                        <VStack>
                            <Input value={education.name} onChange={(e) => setEducation({ ...education, name: e.target.value })} placeholder='Insert previous education name'></Input>
                            <Input value={education.occupation} onChange={(e) => setEducation({ ...education, occupation: e.target.value })} placeholder='Insert previous education'></Input>
                            <HStack w='100%'>
                                <Input type='number' value={education.period.from} onChange={(e) => setEducation({ ...education, period: { ...education.period, from: parseInt(e.target.value) } })} placeholder='Insert previous education period from'></Input>
                                <Input type='number' value={education.period.to} onChange={(e) => setEducation({ ...education, period: { ...education.period, to: parseInt(e.target.value) } })} placeholder='Insert previous education'></Input>
                            </HStack>

                            <Button colorScheme='orange' onClick={onEducationSelected}>Add</Button>
                        </VStack>

                        <Box>
                            <HStack wrap='wrap' gap='10px' p={10}>
                                {
                                    isOpen && selectedEducation.map((education, index) => (
                                        <Box key={index} w='fit-content' display='flex' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                            <VStack>
                                                <Text>{education.name}</Text>
                                                <Text>{education.occupation}</Text>
                                                <Text>{education.period.from} - {education.period.to}</Text>
                                            </VStack>
                                            <CloseIcon m='auto 10px' onClick={() => { setSelectedEducation((educations) => educations.filter((lang, idx) => { return idx !== index })) }} w='10px' />
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

export default Education;