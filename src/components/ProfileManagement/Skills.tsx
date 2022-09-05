import { Box, Button, Container, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'

interface SkillsProps {
    editable?: boolean
    selected?: string[]
    updateSkills: (variable: any) => void
}

const GET_SKILLS = gql`
    query getSkills{
        getSkills
    }
`

const Skills = (props: SkillsProps) => {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [getSkills, { data, loading }] = useLazyQuery(GET_SKILLS);

    const [skills, setSkills] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSave = () => {
        props.updateSkills(selectedSkills);
        onClose();
    }

    const onSkillChanged = (e) => {
        setSelectedSkills([...selectedSkills, e.target.value]);
    }

    const handleOpen = async () => {
        await getSkills();

        onOpen();
    }

    const handleClose = () => {
        setSelectedSkills(props.selected ? props.selected : []);
        onClose();
    }

    useEffect(() => {
        setSelectedSkills(props.selected ? props.selected : []);
        setSkills(data?.getSkills);
    }, [data, loading, props])

    return (
        <>
            <VStack bg='blackAlpha.200' h='300px' borderRadius='20px' w='100%'>
                <HStack p='3' w='100%' bg=' rgba(255,134,38,1.00)' h='50px' justifyContent='space-between' borderTopRadius='20px'>
                    <Text>Skills</Text>
                    {props.editable && <EditIcon onClick={handleOpen} />}
                </HStack>
                <HStack wrap='wrap' gap='10px' p={10}>
                    {
                        selectedSkills.map((skill, index) => (
                            <Box key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
                                <Text >{skill}</Text>
                            </Box>

                        ))
                    }
                </HStack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent minWidth='60%' h='60%'>

                    <ModalHeader>
                        {t('skills')}
                    </ModalHeader>
                    <ModalBody>
                        {!loading && skills && <Select onChange={onSkillChanged} color='black' placeholder='Select skill'>
                            {skills.map((skill, index) => (
                                <option color='black' disabled={selectedSkills.includes(skill)} value={skill} key={index}>{skill}</option>
                            ))}
                        </Select>
                        }
                        <Box>
                            <HStack wrap='wrap' gap='10px' p={10}>
                                {
                                    selectedSkills.map((skill, index) => (
                                        <Box display='flex' key={index} w='fit-content' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>

                                            <Text  >{skill}</Text>
                                            <CloseIcon w='10px' m='auto 10px' onClick={() => setSelectedSkills((skills) => skills.filter((lang, idx) => { return idx !== index }))} />
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

export default Skills