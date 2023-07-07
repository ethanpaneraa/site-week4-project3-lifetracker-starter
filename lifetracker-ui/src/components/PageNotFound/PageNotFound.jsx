import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import React from 'react';
const PageNotFound = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      direction="column"
      py={16}
    >
      <Heading as="h1" size="2xl" mb={4}>
        Page Not Found
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={4}>
        Oops! The page you're looking for does not exist.
      </Text>
      <Image
        src="https://cloudanalysts.com/wp-content/uploads/2021/01/Salesforce_characters_codey_bear.png"
        alt="Codey Bear"
        maxW="300px"
      />
    </Flex>
  );
};

export default PageNotFound;