import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';
import {Rootview, ShiftCard, ShiftList} from '../components';

type Props = {};

const MyShifts = (props: Props) => {

  const [shiftList, setshiftList] = useState([
    {
      title: 'Today',
      data: [
        {
          time: '12:00-14:00',
          area: 'Helsinki',
          booked: false,
          isOverlapping: false,
        },
        {
          time: '14:00-16:00',
          area: 'Sweden',
          booked: true,
          isOverlapping: false,
        },
        {
          time: '20:00-12:00',
          area: 'Turkey',
          booked: false,
          isOverlapping: false,
        },
      ],
    },
    {
      title: 'September 21',
      data: [
        {
          time: '12:00-14:00',
          area: 'Helsinki',
          booked: false,
          isOverlapping: true,
        },
        {
          time: '14:00-16:00',
          area: 'Sweden',
          booked: false,
          isOverlapping: false,
        },
        {
          time: '20:00-12:00',
          area: 'Turkey',
          booked: false,
          isOverlapping: true,
        },
      ],
    }
  ]);
  
  const {myBookedShifts, fetchShifts} = useShiftContext();
  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log('IN MY SHIFT UPDATE',myBookedShifts);
  }, [myBookedShifts]);

  return (
    <Rootview>
      <ShiftList shiftData={shiftList} />
    </Rootview>
  );
};

export default MyShifts;
