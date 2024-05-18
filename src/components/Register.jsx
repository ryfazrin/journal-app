// src/components/Register.jsx
import React, { useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or perform any post-registration actions
    } catch (error) {
      console.error('Error registering:', error);
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
        <Button onClick={handleRegister} colorScheme="teal" width="full">Register</Button>
      </VStack>
    </Box>
  );
};

export default Register;
