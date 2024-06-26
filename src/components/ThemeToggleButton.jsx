// src/components/ThemeToggleButton.jsx
import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
};

export default ThemeToggleButton;
