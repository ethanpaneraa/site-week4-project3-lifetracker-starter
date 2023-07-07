import React from 'react';
import { Box, Text, Stack, Badge } from '@chakra-ui/react';

const SleepCard = ({ sleep }) => {
  const { start_time, end_time } = sleep;

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
          Sleep
        </Text>

        <Badge colorScheme="blue" variant="outline" width="min-content">
          Duration
        </Badge>

        <Text>
          <strong>Start Time:</strong> {start_time}
        </Text>

        <Text>
          <strong>End Time:</strong> {end_time}
        </Text>
      </Stack>
    </Box>
  );
};

export default SleepCard;
