import { useState } from 'react';
import Layout from './theme/Layout'; 
import PantryForm from './components/PantryForm';
import PantryList from './components/PantryList';
import PrivateRoute from './components/PrivateRoute';

const Home = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleOpenList = () => {
    setIsListOpen(true);
  };

  const handleCloseList = () => {
    setIsListOpen(false);
  };

  return (
    <Layout>
      <PrivateRoute>
        <PantryForm fetchPantryItems={handleOpenList} />
        <Button variant="contained" color="secondary" onClick={handleOpenList} sx={{ marginTop: 2 }}>
          Pantry Items
        </Button>
      </PrivateRoute>
      <PantryList open={isListOpen} onClose={handleCloseList} />
    </Layout>
  );
};

export default Home;
