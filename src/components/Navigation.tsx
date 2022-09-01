import { Flex, Heading, ButtonGroup, Button, Box, Circle, Text, Menu, MenuButton, MenuItem, MenuList, Show, Avatar } from '@chakra-ui/react';
import React, { FC, useContext, useEffect } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { AuthConsumer, AuthContext } from '../store/auth-context';
import { IProfileShort } from './ProfileCard';

export interface INavigation {
    image: string
    id: string
}

const Navigation: FC<INavigation> = (props: INavigation) => {
    const outlet = useLocation();
    const navigate = useNavigate();




    return (
        <AuthConsumer>
            {({ logout }) => (
                <Flex minWidth='100%' p='2' m='0' height='50' bg='blackAlpha.200' alignItems='center' justifyContent='space-between' boxShadow='0px 1px 1.5px 1px rgba(0,0,0,0.50);'>
                    <Box>
                        <Heading size='md' colorScheme='orange'>SumJob</Heading>
                    </Box>
                    <Show below='sm'>
                        <FaHamburger />
                    </Show>
                    <Show above='sm'>
                        <ButtonGroup height='50px' display='flex'>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/home" ? "3px solid orange" : ""} to="/dashboard/home"><Text m='auto'>Home</Text></Button>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/companies" ? "3px solid orange" : ""} to="/dashboard/companies"><Text m='auto'>Companies</Text></Button>
                            <Button bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/jobs" ? "3px solid orange" : ""} to="/dashboard/jobs"><Text m='auto'>Jobs</Text></Button>
                        </ButtonGroup>
                        <ButtonGroup m={0}>
                            <Menu>
                                <MenuButton as={Button} m={0} p={0}>
                                    <Avatar size='sm' src={props.image}></Avatar>
                                </MenuButton>
                                <MenuList m={0} p={0}>
                                    <ColorModeSwitcher />
                                    <MenuItem onClick={() => { navigate('/dashboard/profile/' + props.id) }}>User profile</MenuItem>
                                    <MenuItem onClick={logout}>Log out</MenuItem>
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