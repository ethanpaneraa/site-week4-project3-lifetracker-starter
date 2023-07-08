import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import NutritionCard from "../NutritionCard/NutritionCard";
import { Link, Heading, Stack, Flex, Button, Select, Text } from "@chakra-ui/react";

const NutritionPage = ({ user }) => {
  const [nutritionData, setNutritionData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    axios
      .get(`https://lifetracker-server-deployed.onrender.com/nutrition/${user.id}`)
      .then((response) => {
        console.log("response.data:", response.data);
        setNutritionData(response.data.nutrition);
        console.log("nutritionData:", nutritionData);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, [user.id]);

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredNutritionData = filterCategory
    ? nutritionData.filter((nutrition) => nutrition.category === filterCategory)
    : nutritionData;

  console.log("user in Nutrition Page:", user);
  return (
    <Flex align="center" direction="column" minH="100vh" bg="gray.50">
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
      <Flex align="center" justify="center">
        <Stack spacing={4} mt={4} maxW="md" width="100%">
          <Flex align="center" justify="center">
            <Link as={RouterLink} to="/nutrition/create">
              <Button>Create Nutrition Item</Button>
            </Link>
          </Flex>
          <Text
            >
              Filter by category:
            </Text>
          <Flex align="center" justify="center">
            <Select
              value={filterCategory}
              onChange={handleFilterCategoryChange}
              placeholder="Filter by category"
            >
              <option value="">All</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Grain">Grain</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
              <option value="Fat">Fat</option>
            </Select>
          </Flex>
          {filteredNutritionData.length > 0 ? (
            filteredNutritionData.map((nutrition) => (
              <NutritionCard key={nutrition.id} nutrition={nutrition} />
            ))
          ) : (
            <Flex align="center" justify="center">
              <Heading as="h2" size="md">
                No Nutrition Data
              </Heading>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NutritionPage;
