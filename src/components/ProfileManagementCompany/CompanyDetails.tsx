import { EditIcon } from '@chakra-ui/icons'
import { VStack, Box, Text, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Center, Avatar, Divider } from '@chakra-ui/react'
import { Autocomplete } from '@react-google-maps/api'
import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IProfile } from '../../pages/dashboard/profile/Profile'
import { getAddressObject } from '../../utils/transformations'

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
    id?: string
    username?: string
    image?: string
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
    editable: boolean
    updateCompany: (variables: any) => void
}

const CompanyDetails = (props: ICompanyDetails) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState<ICompanyDetails>();
    const [formData, setFormData] = useState<FormData>();
    const [userData, setUserData] = useState<CompanyVariables>();

    const fileInputRef = useRef(null);

    let searchBox;
    const onLoad = ref => searchBox = ref;

    const onPlacesChanged = () => {
        console.log(searchBox.getPlace());
        const address = getAddressObject(searchBox.getPlace().address_components);
        console.log(searchBox.getPlace().geometry.location.lat())
        setUser({ ...user, address: { ...address, latlng: { lat: searchBox.getPlace().geometry.location.lat(), lng: searchBox.getPlace().geometry.location.lng() } } })
        setUserData({ ...userData, address: { ...address, latlng: { lat: searchBox.getPlace().geometry.location.lat(), lng: searchBox.getPlace().geometry.location.lng() } } })

    }

    const handleChange = (e) => {
        let formDataNew = new FormData();
        formDataNew.append('file', e.target.files[0]);
        console.log(props.id);
        formDataNew.append('id', props.id);
        setFormData(formDataNew);
        let reader = new FileReader();
        let url = reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setUser({ ...user, image: reader.result.toString() })
        }
    }

    const handleSave = () => {
        console.log("SAVE");
        const options = {
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:5000/upload-avatar', options).then(res => res.json().then((data) => { setUser({ ...user, image: data.url }) }))
        console.log(userData)
        props.updateCompany(userData);
        onClose();
    }

    const handleClose = () => {
        onClose();
    }
    useEffect(() => {
        console.log(props)
        setUser({ ...props })
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


                        <Text p='5'>{user.companyInfo?.description}</Text>
                        <HStack h='100%' w='100%' p={10} justifyContent='space-around'>
                            <VStack>
                                <Text><b>Company name:</b> {user.companyInfo?.companyName}</Text>

                                <Text><b>Type of company:</b> {user.companyInfo?.typeOfCompany}</Text>
                                <Text><b>Number of employees:</b> {user.companyInfo?.numberOfEmployees}</Text>
                            </VStack>
                            <VStack>
                                <Text><b>City:</b> {user.address.city}</Text>
                                <Text><b>Street:</b> {user.address.street} {user.address.streetNumber}</Text>
                                <Text><b>Postal code:</b> {user.address.postalCode}</Text>
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
                        <Center flexDirection='column' h='100%' justifyContent='flex-start'>
                            <form encType='multipart/form-data'>
                                <Input type='file' accept="image/*" ref={fileInputRef} onChange={handleChange} display='none'></Input>
                            </form>
                            <Text>Upload image</Text>
                            {user && <Avatar _hover={{ cursor: "pointer" }} size='lg' src={user.image} onClick={() => fileInputRef?.current?.click()}></Avatar>}
                            <Divider mt='10px' mb='10px' />
                            <Text>Address</Text>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacesChanged}>
                                <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} placeholder='Adress' w='auto'></Input>
                            </Autocomplete>
                            <Text>Company name</Text>
                            <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} w='241px' placeholder='Change first name' value={user?.companyInfo?.companyName} onChange={(e) => { setUser({ ...user, companyInfo: { ...user?.companyInfo, companyName: e.target.value } }); setUserData({ ...userData, companyInfo: { ...userData.companyInfo, companyName: e.target.value } }) }}></Input>
                            <Text>Company type</Text>
                            <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} w='241px' placeholder='Change first name' value={user?.companyInfo?.typeOfCompany} onChange={(e) => { setUser({ ...user, companyInfo: { ...user.companyInfo, typeOfCompany: e.target.value } }); setUserData({ ...userData, companyInfo: { ...userData.companyInfo, typeOfCompany: e.target.value } }) }}></Input>
                        </Center>
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