// app/page.js
"use client";

import PantryList from '../components/PantryList'; // Import the PantryList component
import PantryForm from '../components/PantryForm';
import { Container, Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Pantry Tracker
        </Typography>
        <PantryForm />
        <PantryList />
      </Box>
    </Container>
  );
}