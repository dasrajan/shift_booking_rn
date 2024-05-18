import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useShiftContext} from 'context/ShiftContext';
import {AreaFilter, Rootview, ShiftList} from '../components';
import {CityObject} from 'types/commonTypes';

type Props = {};

const AvailableShifts = (props: Props) => {
  const [shiftList, setshiftList] = useState<any>([]);
  const [areaList, setareaList] = useState<CityObject[]>([]);
  const [activeArea, setactiveArea] = useState('');

  const {availableData, getAvailableShiftsForCity} = useShiftContext();
  useEffect(() => {
    //Initialize shifts and area data once application loads after initial API call
    if (availableData?.areas && availableData?.availableShiftsList) {
      const activeArea = availableData?.areas[0]?.city;
      setareaList(availableData?.areas);
      setactiveArea(activeArea);
      if (availableData?.availableShiftsList?.length)
        setshiftList(getAvailableShiftsForCity(activeArea));
    }
  }, [availableData]);

  useEffect(() => {
    //Fetch new shifts whenever city changes
    if (activeArea) setshiftList(getAvailableShiftsForCity(activeArea));
  }, [activeArea]);

  return (
    <Rootview>
      {areaList?.length > 0 && (
        <AreaFilter
          areaList={areaList}
          handleChange={(city: string) => setactiveArea(city)}
          active={activeArea}
        />
      )}
      {shiftList?.length > 0 && <ShiftList shiftData={shiftList} />}
    </Rootview>
  );
};

export default AvailableShifts;
