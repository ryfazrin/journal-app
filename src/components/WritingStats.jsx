// src/components/WritingStats.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Text, Button, useColorModeValue, useToast } from '@chakra-ui/react';
import { format } from 'date-fns';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setEntries } from '../store/journalSlice';

const WritingStats = () => {
  const entries = useSelector((state) => state.journal.entries);
  const dispatch = useDispatch();
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  const entriesPerMonth = entries.reduce((acc, entry) => {
    const month = format(new Date(entry.date), 'MMMM yyyy');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const wordFrequency = entries.reduce((acc, entry) => {
    const words = entry.content.split(/\s+/);
    words.forEach((word) => {
      if (word) {
        acc[word] = (acc[word] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const mostFrequentWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const backupEntries = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { entries }, { merge: true });
      toast({
        title: "Backup successful.",
        description: "Your journal entries have been backed up to the cloud.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error backing up entries: ", error);
      toast({
        title: "Backup failed.",
        description: "There was an error backing up your journal entries.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const restoreEntries = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(setEntries(data.entries || []));
        toast({
          title: "Restore successful.",
          description: "Your journal entries have been restored from the cloud.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "No data found.",
          description: "No journal entries were found in the cloud.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error restoring entries: ", error);
      toast({
        title: "Restore failed.",
        description: "There was an error restoring your journal entries.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg={bg} color={color} mt={4}>
      <Heading size="md" mb={4}>Writing Statistics</Heading>
      <Heading size="sm" mb={2}>Entries per Month</Heading>
      {Object.entries(entriesPerMonth).map(([month, count]) => (
        <Text key={month}>{month}: {count}</Text>
      ))}
      <Heading size="sm" mt={4} mb={2}>Most Frequent Words</Heading>
      {mostFrequentWords.map(([word, count]) => (
        <Text key={word}>{word}: {count}</Text>
      ))}
      <Button onClick={backupEntries} colorScheme="teal" mt={4}>Backup to Cloud</Button>
      <Button onClick={restoreEntries} colorScheme="teal" mt={4} ml={2}>Restore from Cloud</Button>
    </Box>
  );
};

export default WritingStats;
