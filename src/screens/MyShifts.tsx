import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';
import {Rootview, ShiftCard, ShiftList} from '../components';
import { getFormattedShift } from 'utils/helper';

type Props = {};

const MyShifts = (props: Props) => {

  const [shiftList, setshiftList] = useState<any>([]);
  
  const {myBookedShifts, isLoading, fetchShifts} = useShiftContext();
  useEffect(() => {
  }, []);

  useEffect(() => {
    setshiftList(getFormattedShift(myBookedShifts))
  }, [myBookedShifts]);

  return (
    <Rootview>
      {/* <Text>{JSON.stringify(isLoading)}</Text> */}
      {shiftList?.length > 0 && <ShiftList shiftData={shiftList} showLabel={false} />}
    </Rootview>
  );
};

export default MyShifts;
