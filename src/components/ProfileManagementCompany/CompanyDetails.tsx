import { EditIcon } from '@chakra-ui/icons'
import { VStack, Box, Text, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IProfile } from '../../pages/dashboard/profile/Profile'

interface CompanyVariables {
    username?: string
    companyInfo?: {
        companyName: string
        numberOfEmployees: string
        typeOfCompany: string
        description: string
    }
    address: {
        city?: string
        postalCode?: string
        state?: string
        street?: string
        streetNumber?: string
        latlng?: {
            lat: number
            lng: number
        }
    }
}

interface ICompanyDetails {
    values: IProfile
    editable: boolean
    updateCompany: () => void
}

const CompanyDetails = (props: ICompanyDetails) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState<ICompanyDetails>();

    const handleSave = () => {

    }

    const handleClose = () => {

    }
    useEffect(() => {
        setUser({ ...props })
        console.log(props.values)
    }, [props])
    return (
        <>
            <VStack bg='blackAlpha.200' minH='300px' h='fit-content' borderRadius='20px' w='100%' >
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>Company details</Text>
                    {user && user.editable && <EditIcon onClick={onOpen} />}
                </HStack>
                {user &&

                    <VStack>


                        <Text p='5'>{user.values.getUser?.companyInfo?.description}</Text>
                        <HStack h='100%' w='100%' p={10} justifyContent='space-around'>
                            <VStack>
                                <Text><b>Company name:</b> {user.values.getUser?.companyInfo?.companyName}</Text>

                                <Text><b>Type of company:</b> {user.values.getUser?.companyInfo?.typeOfCompany}</Text>
                                <Text><b>Number of employees:</b> {user.values.getUser?.companyInfo?.numberOfEmployees}</Text>
                            </VStack>
                            <VStack>
                                <Text><b>City:</b> {user.values.getUser.address.city}</Text>
                                <Text><b>Street:</b> {user.values.getUser.address.street} {user.values.getUser.address.streetNumber}</Text>
                                <Text><b>Postal code:</b> {user.values.getUser.address.postalCode}</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                }
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
                                <Input></Input>
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

export default CompanyDetails