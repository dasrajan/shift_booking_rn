import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AvailableShifts, MyShifts} from '../screens';
import { CustomTabBar } from './CustomBottomTab';

const Tab = createBottomTabNavigator();

type Props = {};

const BottomNavigation = (props: Props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="My Shifts"
          component={MyShifts}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Available Shifts"
          component={AvailableShifts}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
