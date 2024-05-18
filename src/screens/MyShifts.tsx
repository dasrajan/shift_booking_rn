import React, { useEffect } from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';

type Props = {};

const MyShifts = (props: Props) => {
  const {shifts, fetchShifts, updateShift} = useShiftContext();
  useEffect(() => {
    console.log('IN MY SHIFT')
    fetchShifts()
  }, [])
  
  return (
    <View>
      <Text>MyShifts</Text>
      <Text>{JSON.stringify(shifts)}</Text>
    </View>
  );
};

export default MyShifts;
