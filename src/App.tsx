import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Provider } from './app/state';
import ResponsiveDrawer from './components/layout/ResponsiveDrawer';
import { drawerCategories, drawerTitle } from './config/constants';

const App: React.FC = () => {
  return (
      <Router>
        <Provider>
          <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />
        </Provider>
      </Router>
  );
}

export default App;
