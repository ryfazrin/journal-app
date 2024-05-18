// src/components/Reminder.jsx
import { useState, useEffect } from 'react';
import { Box, Input, Button, Heading, VStack } from '@chakra-ui/react';

const Reminder = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const setReminder = () => {
    if (Notification.permission === 'granted') {
      const now = new Date();
      const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time.split(':'));
      const delay = reminderTime - now;

      setTimeout(() => {
        new Notification('Reminder to write your journal!');
      }, delay);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" mt={4} boxShadow="lg" bg="white">
      <Heading size="md" mb={4}>Set Daily Reminder</Heading>
      <VStack spacing={4}>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button onClick={setReminder} colorScheme="teal" width="full">Set Reminder</Button>
      </VStack>
    </Box>
  );
};

export default Reminder;
