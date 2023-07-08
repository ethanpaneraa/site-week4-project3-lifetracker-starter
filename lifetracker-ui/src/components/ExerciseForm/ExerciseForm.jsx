import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
} from '@chakra-ui/react';

const ExerciseForm = ({ user }) => {
  const navigate = useNavigate();
  const [newExerciseData, setNewExerciseData] = useState({
    category: '',
    name: '',
    duration: 0,
    intensity: 0,
  });

  const handleNewExerciseInputChange = (event) => {
    const { name, value } = event.target;
    setNewExerciseData((prevNewExerciseData) => ({
      ...prevNewExerciseData,
      [name]: value,
    }));
  };

  const handleAddExerciseFormSubmit = (event) => {
    event.preventDefault();
    const { category, name, duration, intensity } = newExerciseData;
    const exerciseInfo = {
      category,
      name,
      duration,
      intensity,
    };

    const params = {
      exerciseInfo,
      userID: user.id,
    };

    axios
      .post('https://lifetracker-server-deployed.onrender.com/exercise/create', params)
      .then((response) => {
        console.log('Successfully posted into the database!');
        navigate('/exercise');
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      bg={'gray.50'}
      direction="column"
    >
      <Flex
        bg="#CD5C5C"
        color="white"
        width="100%"
        py={4}
        align="center"
        justify="center"
        padding="75px"
      >
        <Heading as="h1" size="xl">
          Add Exercise Item
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
        <form onSubmit={handleAddExerciseFormSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={newExerciseData.name}
              onChange={handleNewExerciseInputChange}
            />
          </FormControl>
          <FormControl id="category" isRequired>
            <FormLabel>Category:</FormLabel>
            <Select
              name="category"
              value={newExerciseData.category}
              onChange={handleNewExerciseInputChange}
              placeholder="Select a category"
            >
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
              <option value="balance">Balance</option>
            </Select>
          </FormControl>
          <FormControl id="duration" isRequired>
            <FormLabel>Duration:</FormLabel>
            <Input
              type="number"
              name="duration"
              value={newExerciseData.duration}
              onChange={handleNewExerciseInputChange}
            />
          </FormControl>
          <FormControl id="intensity" isRequired>
            <FormLabel>Intensity:</FormLabel>
            <Input
              type="number"
              name="intensity"
              value={newExerciseData.intensity}
              onChange={handleNewExerciseInputChange}
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
              Add Exercise Item
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default ExerciseForm;
