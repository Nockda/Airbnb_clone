import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg={"gray.200"} justifyContent={"center"} minH={"100vh"}>
      <Heading>Page Not Found.</Heading>
      <Text>It seems that you are lost.</Text>
      <Link to="/">
        <Button colorScheme={"facebook"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
