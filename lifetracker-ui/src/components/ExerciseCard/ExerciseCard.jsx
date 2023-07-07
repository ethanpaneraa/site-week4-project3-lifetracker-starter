import React from 'react';
import { Box, Text, Stack, Badge } from '@chakra-ui/react';

const ExerciseCard = ({ exercise }) => {
  const { name, category, duration, intensity } = exercise;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
    >
      <Stack spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>

        <Badge colorScheme="blue" variant="outline" width="min-content">
          {category}
        </Badge>

        <Text>
          <strong>Duration:</strong> {duration} minutes
        </Text>

        <Text>
          <strong>Intensity:</strong> {intensity}
        </Text>
      </Stack>
    </Box>
  );
};

export default ExerciseCard;
