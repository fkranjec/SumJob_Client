import { Avatar, Button, Container, HStack, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

const UPLOAD_IMAGE = gql`
    mutation UploadImage($file: Upload!, $userId: ID!) {
        uploadImage(file: $file, userId: $userId) {
            image
        }
    }  
`;

export interface IUserDetails {
    id?: string
    firstName?: string
    username?: string
    lastName?: string
    address?: {
        city?: string
        postalCode?: string
        state?: string
        street?: string
        streetNumber?: string
    }
    image?: string
}

const UserDetails = (props: IUserDetails) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [image, setImage] = useState<ImageListType>([]);

    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const handleSave = (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        console.log(props.id);
        formData.append('id', props.id);
        const options = {
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:5000/upload-avatar', options).then(res => { console.log(res) })
    }
    return (
        <>
            <VStack bg='blackAlpha.200' h='250px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg='tomato' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>User details</Text>
                    <EditIcon onClick={onOpen} />
                </HStack>
                <VStack m='auto 0' h='100%'>
                    <Text>Username: {props.username}</Text>
                    <Text>First name: {props.firstName}</Text>
                    <Text>Last name: {props.lastName}</Text>
                    <Text>City: {props.address?.city}</Text>
                    <Text>Street: {props.address?.city}</Text>
                </VStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={true}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>
                        UserDetails
                    </ModalHeader>
                    <ModalBody>
                        <form encType='multipart/form-data'>
                            <Input type='file' onChange={handleSave}></Input>
                        </form>

                        <ImageUploading
                            value={image}
                            onChange={(imageList) => { setImage(imageList); console.log(imageList) }}
                        >
                            {({ imageList, onImageUpload, isDragging, dragProps }) => (
                                <div className='upload__image-wrapper'>
                                    <Avatar src={props.image}></Avatar>
                                    <Button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>Upload</Button>
                                </div>
                            )}
                        </ImageUploading>
                        <Text>Address</Text>
                        <Input></Input>
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