// src/components/Login.jsx
import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
      toast({
        title: 'Login failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
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
        <Button onClick={handleLogin} colorScheme="teal" width="full">Login</Button>
        {error && <Text color="red.500">{error}</Text>}
        <Text>Belum memiliki akun? <Button variant="link" colorScheme="teal" as={Link} to="/register">Register</Button></Text>
      </VStack>
    </Box>
  );
};

export default Login;
