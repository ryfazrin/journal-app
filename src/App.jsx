// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Container, Stack, Spinner, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import JournalEntry from './components/JournalEntry';
import JournalList from './components/JournalList';
import Reminder from './components/Reminder';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import ManageTags from './components/ManageTags';
import BottomNavigation from './components/BottomNavigation';
import JournalFilter from './components/JournalFilter';
import MoodStats from './components/MoodStats';
import ExportImportControls from './components/ExportImportControls';
import WritingStats from './components/WritingStats';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('black', 'white');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthChecked(true);
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <Container maxW="container.md" p={4} bg={bg} color={color} borderRadius="lg" boxShadow="xl" textAlign="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Router>
      <Box pb={16}>
        <Container maxW="container.md" p={4} bg={bg} color={color} borderRadius="lg" boxShadow="xl">
          <Heading mb={4} textAlign="center">Daily Journal</Heading>
          <Stack spacing={8}>
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
              <Route path="/" element={user ? (
                <>
                  <Header />
                  <JournalFilter />
                  <JournalEntry />
                  <MoodStats />
                  <WritingStats />
                  <JournalList />
                  <Reminder />
                </>
              ) : (
                <Navigate to="/login" />
              )} />
              <Route path="/manage-tags" element={user ? <ManageTags /> : <Navigate to="/login" />} />
            </Routes>
          </Stack>
        </Container>
        <BottomNavigation />
      </Box>
    </Router>
  );
}

export default App;
