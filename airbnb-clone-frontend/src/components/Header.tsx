import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logout } from "../api";
import { setTimeout } from "timers/promises";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
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
  const toast = useToast();
  const QueryClient = useQueryClient();
  const onLogout = async () => {
    const toastId = toast({
      position: "bottom-right",
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
    });

    const data = await logout();
    QueryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "done",
      description: "see you later!",
    });
  };
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
        <Link to={"/"}>
          <FaAirbnb size={"48"} />
        </Link>
      </Box>
      <HStack spacing={"2"}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen} color={"red.400"}>
                Login
              </Button>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                Sign Up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user.name} src={user.Avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
