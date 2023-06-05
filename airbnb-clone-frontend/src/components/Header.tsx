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
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { logout } from "../api";
import { setTimeout } from "timers/promises";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

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
  const navigate = useNavigate();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logout, {
    onMutate: () => {
      toastId.current = toast({
        position: "bottom-right",
        title: "Login out...",
        description: "Sad to see you go...",
        status: "loading",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        QueryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
        QueryClient.refetchQueries(["me"]);
        QueryClient.refetchQueries(["rooms"]);
        navigate("/");
      }
    },
  });
  const onLogout = async () => {
    mutation.mutate();
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
          <HStack alignItems={"flex-start"}>
            <FaAirbnb size={"48"} />
            <Text as="b" fontSize={"3xl"}>
              HS's Airbnb
            </Text>
          </HStack>
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
                {user?.is_host ? (
                  <>
                    <Link to="/manage-bookings">
                      <MenuItem>Manage bookings</MenuItem>
                    </Link>
                    <Link to="/rooms/upload">
                      <MenuItem>Upload room</MenuItem>
                    </Link>
                  </>
                ) : null}
                <Link to="/mybookings">
                  <MenuItem>My bookings</MenuItem>
                </Link>
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
