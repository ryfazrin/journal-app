// src/components/JournalEntry.jsx
import { useState } from 'react';
import { Box, Input, Textarea, Button, Heading, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/journalSlice';
import { v4 as uuidv4 } from 'uuid';

const JournalEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const saveEntry = () => {
    const newEntry = { id: uuidv4(), title, content, date: new Date().toISOString() };
    dispatch(addEntry(newEntry));
    setTitle('');
    setContent('');
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" mb={4} boxShadow="lg" bg="white">
      <Heading size="md" mb={4}>New Journal Entry</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={saveEntry} colorScheme="teal" width="full">Save</Button>
      </VStack>
    </Box>
  );
};

export default JournalEntry;
