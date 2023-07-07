import React from "react";
import "./ActivityPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Flex, HStack, Heading } from '@chakra-ui/react';
const ActivityPage = ({ user }) => {

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/activity/${user.id}`)
        .then((response) => {
            setActivityData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []); 

    console.log(activityData.activities);


    return (
        <div>
            {activityData.activities ? (
                <Flex 
                    justify="center" 
                    align="center"
                    direction="column"
                    gap={20}
                    >
                <Heading>
                    <Text fontSize="4xl" fontWeight="bold" mb={2} marginTop="100px">
                        Activity Data for: {user.username}
                    </Text>
                </Heading>
                <HStack spacing={4}>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={4}
                  >
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Average Calories Consumed (total)
                    </Text>
                    <Text>
                      Category: {activityData.activities.avgCaloriesPerCategory.category}
                    </Text>
                    <Text>
                      Calories: {Math.floor(activityData.activities.avgCaloriesPerCategory.calories)}
                    </Text>
                  </Box>
          
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={4}
                  >
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Average Time Spent Exercising
                    </Text>
                    <Text>Time (in Minutes): {activityData.activities.totalTimeExercise.duration}</Text>
                  </Box>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={4}
                  >
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Total Time Spent Sleeping (minutes)
                    </Text>
                    <Text>Time (in Minutes): {activityData.activities.totalTimeSleep.duration}</Text>
                  </Box>
                </HStack>
              </Flex>
            ): (<h2>No data available</h2>)}
        </div>
    );
};

export default ActivityPage; 
