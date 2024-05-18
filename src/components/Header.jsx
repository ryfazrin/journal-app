// src/components/Header.jsx
import React from 'react';
import { Box, Flex, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useColorModeValue } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const bg = useColorModeValue('teal.500', 'teal.700');
  const color = useColorModeValue('white', 'gray.100');

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Box bg={bg} color={color} p={4} mb={4} borderRadius="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">Welcome, {user?.email}</Text>
        <Flex>
          <ThemeToggleButton />
          <Button colorScheme="teal" variant="outline" onClick={onOpen} ml={4}>Logout</Button>
        </Flex>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Header;
