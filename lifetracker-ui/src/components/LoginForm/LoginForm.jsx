import React from "react";
import { useState} from "react";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

const LoginForm = ({ loginError, setLoginError, isUserLoggedIn, setIsUserLoggedIn, setUser, user }) => {;
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const handleLoginFormChange = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value,
        });

        console.log(loginFormData)
    };

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        handleUserLogin(loginFormData);
    }

    const handleUserLogin = async (userInfo) => {

        const { data, error } = await ApiClient.loginUser(userInfo);
    
        if (data?.user) {
            setIsUserLoggedIn(true);
            setUser(data.user);
            ApiClient.setToken(data.token);
            setLoginError("")
            navigate("/activity"); 
        } else {
            setLoginError("Invalid email or password");
        }
    }; 

    return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool{' '}
                <Link color={'blue.400'}>features</Link> ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleLoginFormSubmit}>
                    <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input 
                        type="email" 
                        onChange={handleLoginFormChange} 
                        name="email"
                        placeholder="Enter email"
                        value={loginFormData.email}/>
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type="password" 
                        onChange={handleLoginFormChange} 
                        name="password"
                        placeholder="Enter Password"
                        value={loginFormData.password} />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                    >
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}
                        type="submit"
                    >
                        Sign in
                    </Button>
                    <Text align={'center'}>
                Don't have an account yet? <RouterLink to="/register"><Link color={'blue.400'} to="/register">Register Here</Link></RouterLink>
              </Text>
                    </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      
    )
};

export default LoginForm; 