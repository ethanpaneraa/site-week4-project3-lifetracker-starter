import React from "react";
import { useState } from "react";
import "./RegistrationForm.css";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";  
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const RegistrationForm = ({ isUserLoggedIn, registrationError, setUser, setIsUserLoggedIn, setRegistrationError }) => {

    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
    }); 
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleUserRegistration(userFormData);
        if (isUserLoggedIn) {
            setUserFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                username: "",
            });
        }
    }

    const handleUserRegistration = async (userInfo) => {
        const response = await ApiClient.registerUser(userInfo);

        if (response.data?.user) {
            setIsUserLoggedIn(true);
            setUser(response.data.user);
            ApiClient.setToken(response.data.token);
            setRegistrationError(null);
            navigate("/activity");
        } else {
            setRegistrationError(response);
            console.log("registrationError:", response)
        }
    };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
            <Text align={'center'}>
                Already a user? <RouterLink to="/login"><Link color={'blue.400'} to="/login">Login</Link></RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
      
      
  
      
};

export default RegistrationForm;