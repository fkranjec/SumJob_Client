import { Button, Container, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { EditIcon } from '@chakra-ui/icons'

type Props = {}

const UserDetails = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSave = () => {

    }
    return (
        <>
            <VStack bg='tomato' h='250px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg='pink' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>User details</Text>
                    <EditIcon onClick={onOpen} />
                </HStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>
                        Skills
                    </ModalHeader>
                    <ModalBody>
                        Body
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}

export default UserDetails