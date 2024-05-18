// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Container, Stack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import JournalEntry from './components/JournalEntry';
import JournalList from './components/JournalList';
import Reminder from './components/Reminder';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Container maxW="container.md" p={4} bg="gray.50" borderRadius="lg" boxShadow="xl">
        <Heading mb={4} textAlign="center">Daily Journal</Heading>
        <Stack spacing={8}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={user ? (
              <>
                <JournalEntry />
                <JournalList />
                <Reminder />
              </>
            ) : (
              <Navigate to="/login" />
            )} />
          </Routes>
        </Stack>
      </Container>
    </Router>
  );
}

export default App;
