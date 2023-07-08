import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Heading, Stack, Flex, Button } from '@chakra-ui/react';
import SleepCard from '../SleepCard/SleepCard';

const SleepPage = ({ user }) => {
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://lifetracker-server-deployed.onrender.com/sleep/${user.id}`)
      .then((response) => {
        setSleepData(response.data.sleep);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }, [user.id]);

  return (
    <Flex align="center" minH="100vh" direction="column" bg="gray.50">
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
          Sleep
        </Heading>
      </Flex>
      <Flex align="center" justify="center">
        <Stack spacing={4} mt={4} maxW="md" width="100%">
          <Flex align="center" justify="center">
            <Link as={RouterLink} to="/sleep/create">
              <Button>Create Sleep Item</Button>
            </Link>
          </Flex>
          {sleepData.length > 0 ? (
            sleepData.map((sleep) => (
              <SleepCard key={sleep.id} sleep={sleep} />
            ))
          ) : (
            <Flex align="center" justify="center">
              <Heading as="h2" size="md">
                No Sleep Data
              </Heading>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SleepPage;
