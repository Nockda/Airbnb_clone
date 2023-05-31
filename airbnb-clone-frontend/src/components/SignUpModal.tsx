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
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaKey, FaEnvelope, FaUserCheck, FaUserEdit } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUp } from "../api";
import { useForm } from "react-hook-form";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
  currency: string;
  gender: string;
  language: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(SignUp, {
    onSuccess: () => {
      toast({ title: "Welcome!", status: "success" });
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit = ({
    username,
    password,
    name,
    email,
    currency,
    gender,
    language,
  }: IForm) => {
    mutation.mutate({
      username,
      email,
      name,
      password,
      currency,
      gender,
      language,
    });
  };
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserCheck />
                  </Box>
                }
              />
              <Input
                {...register("name", { required: true })}
                placeholder="name"
                variant="filled"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("email", { required: true })}
                placeholder="email"
                variant="filled"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserEdit />
                  </Box>
                }
              />
              <Input
                {...register("username", { required: true })}
                placeholder="username"
                variant="filled"
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
                {...register("password", { required: true })}
                placeholder="password"
                variant="filled"
                type="password"
              />
            </InputGroup>
            <Select
              placeholder="currency option"
              {...register("currency", { required: true })}
            >
              <option value="won">Korean Won</option>
              <option value="usd">Dollar</option>
            </Select>
            <Select
              placeholder="gender option"
              {...register("gender", { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Select
              placeholder="language option"
              {...register("language", { required: true })}
            >
              <option value="kr">Korean</option>
              <option value="en">English</option>
            </Select>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            w="full"
            colorScheme="red"
            mt={4}
            type="submit"
          >
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
