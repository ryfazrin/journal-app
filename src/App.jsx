// src/App.jsx
import { Heading, Container, Stack } from '@chakra-ui/react';
import JournalEntry from './components/JournalEntry';
import JournalList from './components/JournalList';
import Reminder from './components/Reminder';

function App() {
  return (
    <Container maxW="container.md" p={4} bg="gray.50" borderRadius="lg" boxShadow="xl">
      <Heading mb={4} textAlign="center">Daily Journal</Heading>
      <Stack spacing={8}>
        <JournalEntry />
        <JournalList />
        <Reminder />
      </Stack>
    </Container>
  );
}

export default App;
