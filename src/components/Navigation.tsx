import { Flex, Heading, ButtonGroup, Button, Box, Text, Menu, MenuButton, MenuItem, MenuList, Show, Avatar, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { AuthConsumer } from '../store/auth-context';
import { useTranslation } from 'react-i18next';

export interface INavigation {
    image: string
    id: string
    userType: string
}

const Navigation: FC<INavigation> = (props: INavigation) => {
    const outlet = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('common')
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
                            <Button _hover={{ bg: 'rgba(255,134,38,.5)' }} bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/home" ? "3px solid rgba(255,134,38,1.00)" : ""} to="/dashboard/home"><Text m='auto'>{t('navigation.home')}</Text></Button>
                            <Button _hover={{ bg: 'rgba(255,134,38,.5)' }} bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/companies" ? "3px solid rgba(255,134,38,1.00)" : ""} to="/dashboard/companies"><Text m='auto'>{t('navigation.companies')}</Text></Button>
                            <Button _hover={{ bg: 'rgba(255,134,38,.5)' }} bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/jobs" ? "3px solid rgba(255,134,38,1.00)" : ""} to="/dashboard/jobs"><Text m='auto'>{t('navigation.jobs')}</Text></Button>
                            {props.userType === 'COMPANY' && <Button _hover={{ bg: 'rgba(255,134,38,.5)' }} bg='transparent' h='100%' borderRadius='2px' display='flex' textAlign='center' m='auto' as={NavLink} borderBottom={outlet.pathname === "/dashboard/usersPerJob" ? "3px solid rgba(255,134,38,1.00)" : ""} to="/dashboard/usersPerJob"><Text m='auto'>Users per Job</Text></Button>}
                        </ButtonGroup>
                        <ButtonGroup m={0}>
                            <Box>
                                <Menu>
                                    <MenuButton>
                                        <Avatar size='sm' src={props.image}></Avatar>
                                    </MenuButton>
                                    <MenuList>
                                        <ColorModeSwitcher />
                                        <HStack>
                                            <Button colorScheme={i18n.language === 'hr' ? 'orange' : null} onClick={() => { i18n.changeLanguage('hr') }}>
                                                HR
                                            </Button>
                                            <Button colorScheme={i18n.language === 'en' ? 'orange' : null} onClick={() => { i18n.changeLanguage('en') }}>
                                                EN
                                            </Button>
                                        </HStack>

                                        <MenuItem onClick={() => { navigate('/dashboard/profile/' + props.id) }}>User profile</MenuItem>
                                        <MenuItem onClick={logout}>Log out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </ButtonGroup>
                    </Show>

                </Flex >
            )}
        </AuthConsumer>

    )
}

export default Navigation;