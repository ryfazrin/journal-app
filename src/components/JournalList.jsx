// src/components/JournalList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Button, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import { deleteEntry } from '../store/journalSlice';

const JournalList = () => {
  const entries = useSelector((state) => state.journal.entries);
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');
  const dateColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box>
      <Heading size="lg" mb={4}>Journal Entries</Heading>
      <Stack spacing={4}>
        {entries.map((entry) => (
          <Box key={entry.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg={bg} color={color}>
            <Heading size="md">{entry.title}</Heading>
            <Text mt={2}>{entry.content}</Text>
            <Text fontSize="sm" color={dateColor}>{new Date(entry.date).toLocaleString()}</Text>
            <Button onClick={() => dispatch(deleteEntry(entry.id))} colorScheme="red" mt={2}>Delete</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default JournalList;
