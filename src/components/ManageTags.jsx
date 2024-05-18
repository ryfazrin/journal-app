// src/components/ManageTags.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Button, VStack, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { addTag, deleteTag } from '../store/tagsSlice';

const ManageTags = () => {
  const [tag, setTag] = useState('');
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (tag.trim() !== '' && !tags.includes(tag)) {
      dispatch(addTag(tag));
      setTag('');
    }
  };

  const handleDeleteTag = (tag) => {
    dispatch(deleteTag(tag));
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
      <VStack spacing={4}>
        <Input
          placeholder="Add new tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button onClick={handleAddTag} colorScheme="teal" width="full">Add Tag</Button>
        <HStack wrap="wrap" spacing={2}>
          {tags.map((tag) => (
            <Tag key={tag} size="lg" borderRadius="full" variant="solid" colorScheme="teal">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleDeleteTag(tag)} />
            </Tag>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ManageTags;
