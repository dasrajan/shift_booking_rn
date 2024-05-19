import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';
import {Loader, Rootview, ShiftCard, ShiftList} from '../components';
import {getFormattedShift} from 'utils/helper';
import styles from '../styles/globalStyle'

interface MyShiftsType {}

const MyShifts: React.FC<MyShiftsType> = ({}) => {
  const [shiftList, setshiftList] = useState<any>([]);

  const {myBookedShifts, isLoading,allBookedListItem, fetchShifts} = useShiftContext();

  useEffect(() => {
    setshiftList(getFormattedShift(myBookedShifts));
  }, [myBookedShifts]);
  console.log("SHIFT",shiftList)

  return (
    <Rootview>
      {/* <Text>{JSON.stringify(isLoading)}</Text> */}
      {isLoading && <Loader />}
      {!isLoading && allBookedListItem?.length > 0 && (
        <ShiftList shiftData={shiftList} showLabel={false} />
      )}
      {!isLoading && allBookedListItem?.length === 0 && (
        <View style={styles.noShiftWrapper}>
          <Text style={styles.noShiftText}>No Shifts booked yet!</Text>
        </View>
      )}
    </Rootview>
  );
};

export default MyShifts;
