import {
  Box,
  VStack,
  Image,
  Button,
  Grid,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box>
          <Box position={"relative"} overflow={"hidden"} mb={2} rounded="2xl">
            <Image minH="280" src={imageUrl} />
            <Button
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              color={"white"}
            >
              <FaRegHeart size={"20px"} />
            </Button>
          </Box>
        </Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text display={"block"} as="b" noOfLines={1} fontSize={"md"}>
            {name}
          </Text>
          <HStack _hover={{ color: "red.400" }} spacing={1}>
            <FaStar size={15} />
            <Text fontSize={"sm"}>{rating}</Text>
          </HStack>
        </Grid>
        <Text color={gray} fontSize={"small"}>
          {city}, {country}
        </Text>
        <Text color={gray} fontSize={"small"}>
          <Text as="b">${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
