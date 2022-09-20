import { Avatar, Button, Center, Divider, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'
import { Autocomplete } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'
import { getAddressObject } from '../../utils/transformations'

interface UserVariables {
    username?: string
    userInfo?: {
        firstName?: string
        lastName?: string
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

export interface IUserDetails {
    id?: string
    userInfo: {
        firstName?: string
        lastName?: string
    }
    username?: string
    image?: string
    address?: {
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
    editable?: boolean
    updateUser?: (variables: any) => void
}

const UserDetails = (props: IUserDetails) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState<IUserDetails>()
    const [userData, setUserData] = useState<UserVariables>();
    const [formData, setFormData] = useState<FormData>();
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
        const options = {
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:5000/upload-avatar', options).then(res => res.json().then((data) => { setUser({ ...user, image: data.url }) }))
        console.log(userData)
        props.updateUser(userData);
        onClose();
    }

    useEffect(() => {
        setUser({ ...props })
    }, [props])

    return (
        <>

            <VStack bg='blackAlpha.200' h='250px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>User details</Text>
                    {user && user.editable && <EditIcon onClick={onOpen} />}
                </HStack>
                {user &&
                    <HStack justifyContent='space-around' w='100%' h='100%'>
                        <VStack m='auto 0'>
                            <Text><b>Username:</b> {user.username}</Text>
                            <Text><b>First name:</b> {user.userInfo.firstName}</Text>
                            <Text><b>Last name:</b> {user.userInfo.lastName}</Text>
                        </VStack>
                        <VStack m='auto 0'>
                            <Text><b>City:</b> {user.address?.city}</Text>
                            <Text><b>Street:</b> {user.address?.street}</Text>
                            <Text><b>Street number:</b> {user.address?.postalCode}</Text>
                        </VStack>
                    </HStack>

                }
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>

                    <ModalHeader>
                        {t('userDetails')}
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
                            <Text>First name</Text>
                            <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} w='241px' placeholder='Change first name' value={user?.userInfo?.firstName} onChange={(e) => { setUser({ ...user, userInfo: { ...user.userInfo, firstName: e.target.value } }); setUserData({ ...userData, userInfo: { ...userData.userInfo, firstName: e.target.value } }) }}></Input>
                            <Text>Last name</Text>
                            <Input color='black' borderColor='grey' _placeholder={{ color: 'grey' }} w='241px' placeholder='Change first name' value={user?.userInfo?.lastName} onChange={(e) => { setUser({ ...user, userInfo: { ...user.userInfo, lastName: e.target.value } }); setUserData({ ...userData, userInfo: { ...userData.userInfo, lastName: e.target.value } }) }}></Input>
                        </Center>
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

export default UserDetails