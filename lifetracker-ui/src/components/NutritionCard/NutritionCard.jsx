import React from "react";
import { Box, Image, Heading, Text, Stack, Badge } from '@chakra-ui/react'; 


const NutritionCard = ({ nutrition }) => {

    console.log("nutrition in NutritionCard:", nutrition);

    const { name, image, category, calories, quantity } = nutrition;

    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={4}
      >
        <Image src={image} alt={name} mb={4} />
  
        <Stack spacing={2}>
          <Heading as="h3" size="md">
            {name}
          </Heading>
  
          <Badge colorScheme="blue" variant="outline" width="min-content">
            {category}
          </Badge>
  
          <Text>
            <strong>Calories:</strong> {calories}
          </Text>
  
          <Text>
            <strong>Quantity:</strong> {quantity}
          </Text>
        </Stack>
      </Box>
    );
  };

export default NutritionCard; 