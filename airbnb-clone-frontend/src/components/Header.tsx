import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode } = useColorMode();
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{ sm: 4, md: 0 }}
      borderBottomWidth={1}
    >
      <Box color={"red.400"}>
        <FaAirbnb size={48} />
      </Box>
      <HStack spacing={"2"}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        <Button onClick={onLoginOpen} color={"red.400"}>
          Login
        </Button>
        <Button onClick={onSignUpOpen} colorScheme={"red"}>
          Sign Up
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
