import BottomNavigation from 'navigation/BottomNavigator';
import React from 'react';

import {ShiftProvider} from 'context/ShiftContext';

const App = () => {
  return (
    <ShiftProvider>
      <BottomNavigation />
    </ShiftProvider>
  );
};

export default App;
