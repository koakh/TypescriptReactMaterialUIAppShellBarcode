import React, { Fragment } from 'react';
import './App.css';
import ResponsiveDrawer from './components/layout/ResponsiveDrawer';
import { drawerTitle, drawerCategories } from './config/constants';

const App: React.FC = () => {
  return (
    <Fragment>
      <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />
    </Fragment>
  );
}

export default App;
