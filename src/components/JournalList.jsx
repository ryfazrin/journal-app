// src/components/JournalList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Button, Heading, Stack, Tag, TagLabel, useColorModeValue, Image } from '@chakra-ui/react';
import { deleteEntry } from '../store/journalSlice';

const JournalList = () => {
  const entries = useSelector((state) => state.journal.entries);
  const filter = useSelector((state) => state.journal.filter);
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  const filteredEntries = entries.filter((entry) => {
    const matchesKeyword = entry.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
                           entry.content.toLowerCase().includes(filter.keyword.toLowerCase());
    const matchesTag = filter.tag ? entry.tag === filter.tag : true;
    const matchesDate = filter.date ? entry.date.startsWith(filter.date) : true;

    return matchesKeyword && matchesTag && matchesDate;
  });

  return (
    <Box>
      <Heading size="lg" mb={4}>Journal Entries</Heading>
      <Stack spacing={4}>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <Box key={entry.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg={bg} color={color}>
              <Heading size="md">{entry.title}</Heading>
              <Text mt={2}>{entry.content}</Text>
              {entry.tag && (
                <Tag mt={2} size="lg" borderRadius="full" variant="solid" colorScheme="teal">
                  <TagLabel>{entry.tag}</TagLabel>
                </Tag>
              )}
              {entry.mood && (
                <Tag mt={2} size="lg" borderRadius="full" variant="solid" colorScheme="purple">
                  <TagLabel>{entry.mood}</TagLabel>
                </Tag>
              )}
              {entry.attachment && (
                <Image src={entry.attachment} alt={entry.attachmentName} mt={2} />
              )}
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{new Date(entry.date).toLocaleString()}</Text>
              <Button onClick={() => dispatch(deleteEntry(entry.id))} colorScheme="red" mt={2}>Delete</Button>
            </Box>
          ))
        ) : (
          <Text>No journal entries found.</Text>
        )}
      </Stack>
    </Box>
  );
};

export default JournalList;
