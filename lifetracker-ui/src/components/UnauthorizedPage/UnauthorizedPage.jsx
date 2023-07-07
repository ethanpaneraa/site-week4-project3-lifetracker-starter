import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import React from 'react';


const UnauthorizedPage = () => {
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
        Unauthorized
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={4}>
        You are not authorized to view this page.
      </Text>
      <Image
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/628a4e68110473.5b511c318e34c.png"
        alt="Unauthorized"
        maxW="300px"
      />
    </Flex>
  );
};

export default UnauthorizedPage;
