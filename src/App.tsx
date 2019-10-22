import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ResponsiveDrawer from './components/layout/ResponsiveDrawer';
import { drawerCategories, drawerTitle } from './config/constants';

const App: React.FC = () => {
  return (
    <Router>
      <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />
    </Router>
  );
}

export default App;
