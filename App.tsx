import BottomNavigation from 'navigation/BottomNavigator';
import React from 'react';

import {ShiftProvider} from 'context/ShiftContext';
import {ErrorBoundary} from './src/components';

const App = () => {
  return (
    <ShiftProvider>
      <ErrorBoundary>
        <BottomNavigation />
      </ErrorBoundary>
    </ShiftProvider>
  );
};

export default App;
