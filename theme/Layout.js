import { useState, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Logout from '../components/Logout';

const Layout = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            {!user && (
              <>
                <Button color="inherit" onClick={handleClickOpen} sx={{ marginRight: 2 }}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleClickOpen}>
                  Sign Up
                </Button>
              </>
            )}
            {user && <Logout />}
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        {children}
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{user ? 'Logout' : 'Login / Sign Up'}</DialogTitle>
        <DialogContent>
          {user ? <Logout /> : (
            <Box>
              <Login />
              <SignUp />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
