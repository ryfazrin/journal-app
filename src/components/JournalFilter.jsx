// src/components/JournalFilter.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Select, Button, VStack, HStack } from '@chakra-ui/react';
import { setFilter } from '../store/journalSlice';

const JournalFilter = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  const filter = useSelector((state) => state.journal.filter);

  const handleFilterChange = (e) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" mb={4}>
      <VStack spacing={4}>
        <Input
          placeholder="Search by keyword"
          name="keyword"
          value={filter.keyword}
          onChange={handleFilterChange}
        />
        <Select
          placeholder="Filter by tag"
          name="tag"
          value={filter.tag}
          onChange={handleFilterChange}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </Select>
        <Input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
        />
        <Button onClick={() => dispatch(setFilter({ keyword: '', tag: '', date: '' }))} colorScheme="teal" width="full">Clear Filters</Button>
      </VStack>
    </Box>
  );
};

export default JournalFilter;
