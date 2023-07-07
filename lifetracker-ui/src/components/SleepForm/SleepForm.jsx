import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';

const SleepForm = ({ user }) => {
  const navigate = useNavigate();
  const [sleepStartData, setSleepStartData] = useState('2023-01-01T12:00');
  const [sleepEndData, setSleepEndData] = useState('2023-01-01T12:00');

  const handleSleepStartInputChange = (event) => {
    const { value } = event.target;
    setSleepStartData(value);
  };

  const handleSleepEndInputChange = (event) => {
    const { value } = event.target;
    setSleepEndData(value);
  };

  const handleAddSleepFormSubmit = (event) => {
    event.preventDefault();
    const sleepStart = sleepStartData;
    const sleepEnd = sleepEndData;
    const sleepInfo = {
      start_time: sleepStart,
      end_time: sleepEnd,
    };

    const params = {
      sleepInfo,
      userID: user.id,
    };

    axios
      .post('http://localhost:3001/sleep/create', params)
      .then((response) => {
        console.log('Successfully posted into the database!');
        navigate('/sleep');
      });
  };

  return (
    <Flex minH={'100vh'} align={'center'} bg={'gray.50'} direction="column">
      <Flex
        bg="#4B0082"
        color="white"
        width="100%"
        py={4}
        align="center"
        justify="center"
        padding="75px"
      >
        <Heading as="h1" size="xl">
          Add Sleep Item
        </Heading>
      </Flex>
      <Box
        margin="75px"
        rounded={'lg'}
        bg={'white'}
        boxShadow={'lg'}
        p={8}
        maxW={'md'}
        w={'full'}
      >
        <form onSubmit={handleAddSleepFormSubmit}>
          <FormControl id="sleepStart" isRequired>
            <FormLabel>Sleep Start:</FormLabel>
            <Input
              type="datetime-local"
              name="sleepStart"
              value={sleepStartData}
              onChange={handleSleepStartInputChange}
            />
          </FormControl>
          <FormControl id="sleepEnd" isRequired>
            <FormLabel>Sleep End:</FormLabel>
            <Input
              type="datetime-local"
              name="sleepEnd"
              value={sleepEndData}
              onChange={handleSleepEndInputChange}
            />
          </FormControl>
          <Flex direction="column" align="center" justify="center">
            <Button
              type="submit"
              mt={4}
              colorScheme="blue"
              size="lg"
              isFullWidth
            >
              Add Sleep Item
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default SleepForm;
