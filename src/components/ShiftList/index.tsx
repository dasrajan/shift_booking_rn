import React, {Fragment, useState} from 'react';
import {SafeAreaView, SectionList, Text, View} from 'react-native';

import styles from './ShiftListStyle';
import {ShiftCard} from '../index';
import {useShiftContext} from 'context/ShiftContext';
import { ShiftCardType, ShiftObject } from 'types/commonTypes';
import { formatSimpleTime } from 'utils/helper';

interface ShiftListType {
  shiftData: any;
}
const ShiftList: React.FC<ShiftListType> = ({shiftData}) => {
  const {shifts, overlappingList, bookShift} = useShiftContext();

  const renderSectionHedaer = (title: string, totalShiftTime?: string) => {
    return (
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionTitleText}>{title}</Text>
        {totalShiftTime && <Text style={styles.shiftTitleText}>{totalShiftTime}</Text>}
      </View>
    );
  };

  return (
    <View>
      <SectionList
        sections={shiftData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          const shiftData: ShiftObject = shifts[item];
          const timeStamp = formatSimpleTime(shiftData?.startTime, shiftData?.endTime)
        //   console.log("🚀 ~ shiftData:",item)
          return (
            <ShiftCard
              time={timeStamp}
              area={shiftData?.area}
              booked={shiftData?.booked}
              isOverlapping={overlappingList?.includes(item)}
              onhandleBook={()=> bookShift(item)}
              onhandleCancel={()=> {}}
            />
          );
        }}
        renderSectionHeader={({section: {title}}) => renderSectionHedaer(title)}
        ItemSeparatorComponent={({}) => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

export default ShiftList;
