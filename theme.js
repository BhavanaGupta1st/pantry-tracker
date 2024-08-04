import { useState, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import PantryList from '../components/PantryList';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Logout from '../components/Logout';

const Layout = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('login'); // Track dialog type
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          {user ? (
            <>
              <Logout />
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleOpenDialog('login')}>Login</Button>
              <Button color="inherit" onClick={() => handleOpenDialog('signup')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        {children}
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{dialogType === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
        <DialogContent>
          {dialogType === 'login' ? <Login /> : <SignUp />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
