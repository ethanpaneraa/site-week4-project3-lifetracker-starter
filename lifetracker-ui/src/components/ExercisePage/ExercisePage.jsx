import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Heading, Stack, Flex, Button } from '@chakra-ui/react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const ExercisePage = ({ user }) => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://lifetracker-server-deployed.onrender.com/exercise/${user.id}`)
      .then((response) => {
        setExerciseData(response.data.allExercises);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }, [user.id]);

  return (
    <Flex align="center" minH="100vh" direction="column" bg="gray.50">
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
          Exercises
        </Heading>
      </Flex>
      <Flex align="center" justify="center">
        <Stack spacing={4} mt={4} maxW="md" width="100%">
          <Flex align="center" justify="center">
            <Link as={RouterLink} to="/exercise/create">
              <Button>Create Exercise Item</Button>
            </Link>
          </Flex>
          {exerciseData.length > 0 ? (
            exerciseData.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))
          ) : (
            <Flex align="center" justify="center">
              <Heading as="h2" size="md">
                No Exercise Data
              </Heading>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default ExercisePage;
