import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';
import {AreaFilter, Rootview, ShiftList} from '../components';

type Props = {};

const AvailableShifts = (props: Props) => {
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
    },
    {
      title: 'Drinks',
      data: [
        {
          time: '2:00-14:00',
          area: 'Helsinki',
          booked: true,
          isOverlapping: false,
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
          isOverlapping: false,
        },
      ],
    },
    {
      title: 'Drinks',
      data: [
        {
          time: '2:00-14:00',
          area: 'Helsinki',
          booked: true,
          isOverlapping: false,
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
          isOverlapping: false,
        },
      ],
    },
  ]);
  const [areaList, setareaList] = useState([
    {
      city: 'Helsinki',
      count: 8,
    },
    {
      city: 'Tampere',
      count: 8,
    },
    {
      city: 'Turku',
      count: 5,
    },
  ]);
  const [activeArea, setactiveArea] = useState('Helsinki');

  const {shifts, fetchShifts, updateShift} = useShiftContext();
  useEffect(() => {
    console.log('IN MY SHIFT');
    // fetchShifts();
  }, []);

  return (
    <Rootview>
      <AreaFilter
        areaList={areaList}
        handleChange={(city: string) => setactiveArea(city)}
        active={activeArea}
      />
      <ShiftList shiftData={shiftList} />
    </Rootview>
  );
};

export default AvailableShifts;
