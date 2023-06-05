import { FaCamera, FaPencilAlt, FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
    window.location.reload();
  };
  const onPencilClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/modify`);
    window.location.reload();
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          w="100%"
          position="relative"
          overflow={"hidden"}
          mb={3}
          rounded="2xl"
        >
          {imageUrl ? (
            <Image
              objectFit={"cover"}
              boxSize="290"
              fit={"fill"}
              minH="280"
              maxH="280"
              src={imageUrl}
            />
          ) : (
            <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
          )}

          {isOwner ? (
            <Box>
              <Button
                variant={"unstyled"}
                position={"absolute"}
                top={0}
                right={10}
                color="white"
                onClick={onPencilClick}
              >
                <FaPencilAlt size="20px" />
              </Button>
              <Button
                variant={"unstyled"}
                position={"absolute"}
                top={0}
                right={0}
                color="white"
                onClick={onCameraClick}
              >
                <FaCamera size="20px" />
              </Button>
            </Box>
          ) : (
            <Button
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              color="white"
            >
              <FaRegHeart size="20px" />
            </Button>
          )}
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
