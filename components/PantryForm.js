import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const PantryForm = ({ fetchPantryItems }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddItem = async () => {
    if (name && quantity) {
      try {
        await addDoc(collection(firestore, 'pantryItems'), {
          name,
          quantity: parseInt(quantity),
        });
        setName('');
        setQuantity('');
        fetchPantryItems(); // Fetch updated list after adding the item
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 4,
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add a New Pantry Item
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          marginBottom: 2,
          width: '100%',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          '& .MuiInputBase-root': {
            padding: '12px',
          },
        }}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{
          marginBottom: 2,
          width: '100%',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          '& .MuiInputBase-root': {
            padding: '12px',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        sx={{ marginTop: 2, width: '100%' }}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default PantryForm;
