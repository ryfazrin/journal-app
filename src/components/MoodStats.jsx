// src/components/MoodStats.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const MoodStats = () => {
  const entries = useSelector((state) => state.journal.entries);
  const moodCounts = entries.reduce((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg={bg} color={color} mt={4}>
      <Heading size="md" mb={4}>Mood Statistics</Heading>
      {Object.entries(moodCounts).length > 0 ? (
        Object.entries(moodCounts).map(([mood, count]) => (
          <Text key={mood}>{mood}: {count}</Text>
        ))
      ) : (
        <Text>No mood data available.</Text>
      )}
    </Box>
  );
};

export default MoodStats;
