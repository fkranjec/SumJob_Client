import { Box, Button, Container, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { scrollBarStyle } from '../../utils/styles'
interface IEducation {
    title: string
    editable: boolean
    selected?: string[]
    updateEducation: (variables: any) => void
}



const Education = (props: IEducation) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [education, setEducation] = useState<string>('')
    const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
    const handleSave = () => {
        props.updateEducation(selectedEducation);
        onClose();
    }

    const onEducationSelected = () => {
        setSelectedEducation([...selectedEducation, education])
        setEducation('');
    }

    const handleOpen = async () => {
        onOpen();

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
                        selectedEducation.map((language, index) => (
                            <Box key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                <Text>{language}</Text>
                            </Box>
                        ))
                    }
                </HStack>

            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>
                    <ModalHeader>
                        {t('languages')}
                    </ModalHeader>
                    <ModalBody>
                        <HStack>
                            <Input value={education} onChange={(e) => setEducation(e.target.value)} placeholder='Insert previous education'></Input>
                            <Button colorScheme='orange' onClick={onEducationSelected}>Add</Button>
                        </HStack>

                        <Box>
                            <HStack wrap='wrap' gap='10px' p={10}>
                                {
                                    isOpen && selectedEducation.map((language, index) => (
                                        <Box key={index} w='fit-content' display='flex' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                            <Text>{language}</Text>
                                            <CloseIcon m='auto 10px' onClick={() => { setSelectedEducation((educations) => educations.filter((lang, idx) => { return idx !== index })) }} w='10px' />
                                        </Box>
                                    ))
                                }
                            </HStack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>{t('modal.close')}</Button>
                        <Button onClick={handleSave}>{t('modal.save')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Education;