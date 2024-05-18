// src/components/BottomNavigation.jsx
import React from 'react';
import { Box, IconButton, HStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTags } from 'react-icons/fa';

const BottomNavigation = () => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/login' || location.pathname === '/register';

  if (hideNavigation) {
    return null;
  }

  return (
    <Box position="fixed" bottom="0" width="100%" bg="gray.800" p={2} color="white" boxShadow="md">
      <HStack justifyContent="space-around">
        <IconButton
          as={Link}
          to="/"
          icon={<FaHome />}
          aria-label="Home"
          variant="ghost"
          colorScheme="teal"
        />
        <IconButton
          as={Link}
          to="/manage-tags"
          icon={<FaTags />}
          aria-label="Manage Tags"
          variant="ghost"
          colorScheme="teal"
        />
      </HStack>
    </Box>
  );
};

export default BottomNavigation;
