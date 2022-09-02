import { Button, Container, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'

type Props = {}

const PreviousJobs = (props: Props) => {
    const { t } = useTranslation('common');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSave = () => {

    }
    return (
        <>
            <VStack bg='blackAlpha.200' h='300px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>Previous jobs</Text>
                    <EditIcon onClick={onOpen} />
                </HStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>
                        {t('prevJovs')}
                    </ModalHeader>
                    <ModalBody>
                        Body
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

export default PreviousJobs