import { Flex, Heading, ButtonGroup, Button, Box, Circle, Text, Menu, MenuButton, MenuItem, MenuList, Show } from '@chakra-ui/react';
import React, { FC, useContext, useEffect } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { AuthConsumer, AuthContext } from '../store/auth-context';

const Navigation: FC = () => {
    const outlet = useLocation();
    useEffect(() => {
    }, []);



    return (
        <AuthConsumer>
            {({ isLogedIn, username }) => (
                <Flex minWidth='100%' p='2' m='0' height='50' bg='blackAlpha.200' alignItems='center' justifyContent='space-between' boxShadow='0px 1px 1.5px 1px rgba(0,0,0,0.50);'>

                    <Box>
                        <Heading size='md' colorScheme='orange'>SumJob</Heading>
                    </Box>
                    <Show below='sm'>
                        <FaHamburger />
                    </Show>
                    <Show above='sm'>
                        <ButtonGroup height='50px' gap='2' display='flex'>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/home" ? "3px solid orange" : ""} to="/dashboard/home"><Text m='auto'>Home</Text></Button>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/companies" ? "3px solid orange" : ""} to="/dashboard/companies"><Text m='auto'>Companies</Text></Button>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/jobs" ? "3px solid orange" : ""} to="/dashboard/jobs"><Text m='auto'>Jobs</Text></Button>
                        </ButtonGroup>
                        <ButtonGroup gap='2'>
                            <Menu>
                                <MenuButton>
                                    <Circle size='8' m='auto' bg='orange' />
                                </MenuButton>
                                <MenuList>
                                    <ColorModeSwitcher />
                                    <MenuItem>Settings</MenuItem>
                                    <MenuItem>User profile</MenuItem>
                                    <MenuItem>Mark as Draft</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                    <MenuItem>Attend a Workshop</MenuItem>
                                </MenuList>
                            </Menu>


                        </ButtonGroup>
                    </Show>

                </Flex >
            )}
        </AuthConsumer>

    )
}

export default Navigation;