import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import colors from 'styles/colors';

interface IRootView {
  children?: any;
}

const RootView: React.FC<IRootView> = ({children}) => {
  return (
    <SafeAreaView style={styles.rootView}>
      {children}
    </SafeAreaView>
  );
};

export default RootView;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
