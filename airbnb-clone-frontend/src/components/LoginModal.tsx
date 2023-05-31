import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaKey, FaUserAlt } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariable,
  usernameLogin,
} from "../api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const QueryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    IUsernameLoginError,
    IUsernameLoginVariable
  >(usernameLogin, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome Back",
        status: "success",
      });
      onClose();
      reset();
      QueryClient.refetchQueries(["me"]);
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                required
                {...register("username", { required: true })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaKey />
                  </Box>
                }
              />
              <Input
                required
                {...register("password", { required: true })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={"red.600"} fontSize={"sm"} textAlign={"center"}>
              Username or password are wrong
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme="red"
            w={"100%"}
          >
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
