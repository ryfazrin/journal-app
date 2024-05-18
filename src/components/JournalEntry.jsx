// src/components/JournalEntry.jsx
import React, { useState } from 'react';
import { Box, Input, Textarea, Button, Heading, VStack, Select, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../store/journalSlice';
import { v4 as uuidv4 } from 'uuid';

const JournalEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [mood, setMood] = useState('');
  const [attachment, setAttachment] = useState(null);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const saveEntry = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newEntry = {
        id: uuidv4(),
        title,
        content,
        tag: selectedTag,
        mood,
        attachment: reader.result,
        attachmentName: attachment ? attachment.name : null,
        date: new Date().toISOString()
      };
      dispatch(addEntry(newEntry));
      setTitle('');
      setContent('');
      setSelectedTag('');
      setMood('');
      setAttachment(null);
    };
    if (attachment) {
      reader.readAsDataURL(attachment);
    } else {
      reader.onloadend();
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" mb={4} boxShadow="lg" bg={bg} color={color}>
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
        <Select
          placeholder="Select Tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </Select>
        <Select
          placeholder="Select Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="neutral">Neutral</option>
          <option value="excited">Excited</option>
          <option value="angry">Angry</option>
        </Select>
        <Input type="file" accept="image/*" onChange={handleAttachmentChange} />
        <Button onClick={saveEntry} colorScheme="teal" width="full">Save</Button>
      </VStack>
    </Box>
  );
};

export default JournalEntry;
