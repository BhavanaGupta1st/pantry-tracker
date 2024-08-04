// main/components/Logout.js
import { Button, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the Firebase Auth instance

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect or show success message
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
