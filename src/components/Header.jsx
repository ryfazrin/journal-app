// src/components/Header.jsx
import React, { useState } from 'react';
import { Box, Flex, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Box bg="teal.500" color="white" p={4} mb={4} borderRadius="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">Welcome, {user?.email}</Text>
        <Button colorScheme="teal" variant="outline" onClick={onOpen}>Logout</Button>
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
