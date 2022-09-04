import { Box, Button, Container, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/client'
import { updateLanguageServiceSourceFile } from 'typescript'
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
                <VStack w='100%' overflowY='auto' css={scrollBarStyle}>
                    {
                        selectedEducation.map((language, index) => (
                            <Text key={index}>{language}</Text>
                        ))
                    }
                </VStack>

            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>
                    <ModalHeader>
                        {t('languages')}
                    </ModalHeader>
                    <ModalBody>
                        <Input value={education} onChange={(e) => setEducation(e.target.value)} placeholder='Insert previous education'></Input>
                        <Button colorScheme='orange' onClick={onEducationSelected}>Add</Button>
                        <Box>
                            <VStack>
                                {
                                    selectedEducation.map((language, index) => (
                                        <Text key={index}>{language}</Text>
                                    ))
                                }
                            </VStack>
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