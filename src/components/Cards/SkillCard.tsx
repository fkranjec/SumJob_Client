import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface ISkillCard {
    skill: string,
    children?: any
}

const SkillCard = ({ skill, children }: ISkillCard) => {
    return (
        <Box w='fit-content' display='flex' flex='0 0 fit-content' p={2} bg='rgba(255,134,38,1.00)' borderRadius='10px'>
            <Text>{skill}</Text>
            {children}
        </Box>
    )
}

export default SkillCard