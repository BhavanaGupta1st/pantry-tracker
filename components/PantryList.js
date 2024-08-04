import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { Box, List, ListItem, ListItemText, IconButton, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PantryList = ({ open, onClose }) => {
  const [pantryItems, setPantryItems] = useState([]);

  const fetchPantryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'pantryItems'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPantryItems(items);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'pantryItems', id));
      setPantryItems(pantryItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pantry Items</DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: 2 }}>
          <List>
            {pantryItems.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PantryList;
