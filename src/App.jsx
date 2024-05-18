// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Container, Stack, Spinner } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import JournalEntry from './components/JournalEntry';
import JournalList from './components/JournalList';
import Reminder from './components/Reminder';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

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
      <Container maxW="container.md" p={4} bg="gray.50" borderRadius="lg" boxShadow="xl" textAlign="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Router>
      <Container maxW="container.md" p={4} bg="gray.50" borderRadius="lg" boxShadow="xl">
        <Heading mb={4} textAlign="center">Daily Journal</Heading>
        <Stack spacing={8}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={user ? (
              <>
                <Header />
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
