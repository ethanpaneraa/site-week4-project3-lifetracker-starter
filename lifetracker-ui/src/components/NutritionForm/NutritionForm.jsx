import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Heading
  } from '@chakra-ui/react';


const NutritionForm = ({ user }) => {

    const navigate = useNavigate();
    const [newNutritionData, setNewNutritionData] = useState({
        name: "",
        category: "",
        calories: 0,
        imageUrl: "",
        quantity: 1,
    }); 

    const handleNewNutritionInputChange = (event) => {
        const { name, value } = event.target;
        setNewNutritionData((prevNewNutritionData) => ({
            ...prevNewNutritionData,
            [name]: value,
        }));

        console.log("newNutritionData:", newNutritionData)
    }


    const handleAddNutritionFormSubmit = (event) => {
        event.preventDefault(); 
        const nutritionName = newNutritionData.name;
        const nutritionCategory = newNutritionData.category;
        const calories = newNutritionData.calories;
        const imageUrl = newNutritionData.imageUrl;
        const quantity = newNutritionData.quantity;
        const nutritionInfo = {
            nutritionName: nutritionName,
            nutritionCategory: nutritionCategory,
            calories: calories,
            imageUrl: imageUrl,
            quantity: quantity,
            
        }

        const params = {
            nutritionInfo: nutritionInfo,
            userID: user.id,
        }; 

        axios.post("http://localhost:3001/nutrition/create", params)
        .then((response) => {
            console.log("Successfully posted into the database!");
            navigate("/nutrition");
        })
    }

     return (
    <Flex
      minH={'100vh'}
      align={'center'}
    //   justify={'center'}
      bg={'gray.50'}
      direction="column"
      >
     <Flex
            bg="primary.500"
            color="white"
            width="100%"
            py={4}
            align="center"
            justify="center"
            padding="75px"
          >
            <Heading as="h1" size="xl">
              Create Nutrition Item
            </Heading>
          </Flex>
      <Box
        margin="75px"
        rounded={'lg'}
        bg={'white'}
        boxShadow={'lg'}
        p={8}
        maxW={'md'}
        w={'full'}>
        <form onSubmit={handleAddNutritionFormSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={newNutritionData.name}
              onChange={handleNewNutritionInputChange}
            />
          </FormControl>
          <FormControl id="category" isRequired>
            <FormLabel>Category:</FormLabel>
            <Select
              name="category"
              value={newNutritionData.category}
              onChange={handleNewNutritionInputChange}
              placeholder="Select a category">
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Grain">Grain</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
              <option value="Fat">Fat</option>
            </Select>
          </FormControl>
          <FormControl id="calories" isRequired>
            <FormLabel>Calories:</FormLabel>
            <Input
              type="number"
              name="calories"
              value={newNutritionData.calories}
              onChange={handleNewNutritionInputChange}
            />
          </FormControl>
          <FormControl id="quantity" isRequired>
            <FormLabel>Quantity:</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={newNutritionData.quantity}
              onChange={handleNewNutritionInputChange}
            />
          </FormControl>
          <FormControl id="imageUrl" isRequired>
            <FormLabel>Image URL:</FormLabel>
            <Input
              type="text"
              name="imageUrl"
              value={newNutritionData.imageUrl}
              onChange={handleNewNutritionInputChange}
            />
          </FormControl>

          <Flex
            direction="column"
            align="center"
            justify="center"
          >
            <Button
                type="submit"
                mt={4}
                colorScheme="blue"
                size="lg"
                isFullWidth>
                Add Nutrition Item
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default NutritionForm; 