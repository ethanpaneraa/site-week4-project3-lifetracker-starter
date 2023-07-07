import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import NutritionForm from "../NutritionForm/NutritionForm";
import NutritionCard from "../NutritionCard/NutritionCard";
import { Link, Heading, Stack, Flex, Button } from "@chakra-ui/react";

const NutritionPage = ({ user }) => {

    const [nutritionData, setNutritionData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/nutrition/${user.id}`)
        .then((response) => {
            console.log("response.data:", response.data);
            setNutritionData(response.data.nutrition);
            console.log("nutritionData:", nutritionData);
        })
        .catch((error) => {
            console.log("error:", error);
        })
    }, [user.id])

    console.log("user in Nutrition Page:", user); 
    return (
        <Flex
          align="center"
        //   justify="center"
          minH="100vh"
          direction="column"
          bg="gray.50"
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
              Nutrition
            </Heading>
          </Flex>
          <Flex
            align="center"
            justify="center">
            <Stack spacing={4} mt={4} maxW="md" width="100%">
                <Flex
                    align="center"
                    justify="center"
                    >
                    <Link as={RouterLink} to="/nutrition/create">
                    <Button>Create Nutrition Item</Button>
                    </Link>
                </Flex>
                {nutritionData.length > 0 ? (
                nutritionData.map((nutrition) => (
                    <NutritionCard key={nutrition.id} nutrition={nutrition} />
                ))
                ) : (
                <Heading as="h2" size="md">
                    No Nutrition Data
                </Heading>
                )}
            </Stack>
          </Flex>
        </Flex>
      );
};

export default NutritionPage; 