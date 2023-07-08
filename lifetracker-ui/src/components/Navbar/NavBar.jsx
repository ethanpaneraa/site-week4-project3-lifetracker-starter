import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
    Button as ChakraButton,
  } from '@chakra-ui/react';  


const NavBar = ({ isUserLoggedIn, setUser, setIsUserLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogoutUser = () => {    
        setIsUserLoggedIn(false);
        setUser({});
        localStorage.removeItem('token');
        navigate("localhost:5173/");
      }


    return (
        <div>
            <Box bg={useColorModeValue("#edf2f6")} p="20px" >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing="20px" gap="7px" alignItems={'center'}>
                        <Heading as="h1">LifeTracker</Heading>
                        {isUserLoggedIn && (
                            <HStack as={"nav"} spacing={4} display={{base:"none", md:"flex"}}>
                            <Link 
                                as={RouteLink} 
                                to="/activity" 
                                px="2px"
                                py="1px" 
                                rounded={"md"}
                                _hover={
                                {textDecoration: "none",
                                bg: useColorModeValue("#e2e8f0")}}
                                >
                                Activity
                            </Link>
                            <Link 
                                as={RouteLink} 
                                to="/exercise" 
                                px={2} 
                                py={1} 
                                rounded={"md"} 
                                _hover={
                                {textDecoration: "none",
                                bg: useColorModeValue("#e2e8f0")}}
                                >
                                Exercise
                            </Link>
                            <Link 
                                as={RouteLink} 
                                to="/nutrition" 
                                px={2} 
                                py={1} 
                                rounded={"md"} 
                                _hover={
                                {textDecoration: "none",
                                bg: useColorModeValue("#e2e8f0")}}
                                >
                                Nutrition
                            </Link>
                            <Link 
                                as={RouteLink} 
                                to="/sleep" 
                                px={2} 
                                py={1} 
                                rounded={"md"} 
                                _hover={
                                {textDecoration: "none",
                                bg: useColorModeValue("#e2e8f0")}}
                                >
                                Sleep
                            </Link>
                        </HStack>
                        )}
                    </HStack>
                    <Flex alignItems={'center'}>
                    {!isUserLoggedIn ? (
                    <HStack>
                        <RouteLink to="/register">
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'primary'}
                            bg={'primary.500'}
                            _hover={{ bg: 'primary.600' }}>
                            Register
                        </Button>
                        </RouteLink>
                        <RouteLink to="/login">
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'primary'}
                            bg={'primary.500'}
                            _hover={{ bg: 'primary.600' }}>
                            Login
                        </Button>
                        </RouteLink>
                </HStack>

                ) : 
                    <ChakraButton
                        variant={'solid'}
                        colorScheme={'teal'}
                        size={'sm'}
                        mr={4}
                        onClick={() => {
                            window.location.href = "http://localhost:5173/";
                            handleLogoutUser();
                        }}  >
                Log Out
                </ChakraButton>}
                                    </Flex>
                                </Flex>
                            </Box>
        </div>
    );
};

export default NavBar; 
