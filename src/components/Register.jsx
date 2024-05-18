// src/components/Register.jsx
import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text, useToast, Heading, useColorModeValue } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Registration successful.',
        description: 'You have successfully registered. Please log in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      setError('Failed to register. Please try again.');
      toast({
        title: 'Registration failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg={bg} color={color}>
      <Heading size="lg" mb={6}>Register</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister} colorScheme="teal" width="full">Register</Button>
        {error && <Text color="red.500">{error}</Text>}
        <Text>Sudah memiliki akun? <Button variant="link" colorScheme="teal" as={Link} to="/login">Login</Button></Text>
      </VStack>
    </Box>
  );
};

export default Register;
