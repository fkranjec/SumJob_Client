import { Box, Button, Container, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/client'
import { updateLanguageServiceSourceFile } from 'typescript'
import { scrollBarStyle } from '../../utils/styles'
interface ILanguage {
    title: string
    editable: boolean
    selected?: string[]
    updateUser: (variables: any) => void
}

const GET_LANGUAGES = gql`
    query getLanguages{
        getLanguages
    }
`;

const Languages = (props: ILanguage) => {
    const { t } = useTranslation('common');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [getLanguages, { data, loading }] = useLazyQuery(GET_LANGUAGES);
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const handleSave = () => {
        props.updateUser(selectedLanguages);
        onClose();
    }

    const onLanguageSelected = (e) => {
        setSelectedLanguages([...selectedLanguages, e.target.value])
    }

    const handleOpen = async () => {
        await getLanguages();

        onOpen();

    }

    const handleClose = () => {
        setSelectedLanguages(props.selected ? props.selected : [])
        onClose()
    }
    useEffect(() => {
        console.log(data)
        setSelectedLanguages(props.selected ? props.selected : [])
        setLanguages(data?.getLanguages)
    }, [data, loading, props])
    return (
        <>
            <VStack bg='blackAlpha.200' minH='300px' h='fit-content' borderRadius='20px' w='100%' >
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>{props.title}</Text>
                    {props.editable && <EditIcon onClick={handleOpen} />}
                </HStack>
                <VStack p={10}>
                    {
                        selectedLanguages.map((language, index) => (
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
                        {!loading && languages && <Select onChange={onLanguageSelected} color='black' placeholder='Select language'>
                            {languages.map((language, index) => (
                                <option color='black' disabled={selectedLanguages.includes(language)} value={language} key={index}>{language}</option>
                            ))}
                        </Select>
                        }

                        <Box>
                            <VStack>
                                {
                                    selectedLanguages.map((language, index) => (
                                        <Text onClick={() => setSelectedLanguages((languages) => languages.filter((lang, idx) => { return idx !== index }))} key={index}>{language}</Text>
                                    ))
                                }
                            </VStack>
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

export default Languages