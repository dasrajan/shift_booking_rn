import React, {Fragment, useState} from 'react';
import {SafeAreaView, SectionList, Text, View} from 'react-native';

import styles from './ShiftListStyle';
import {ShiftCard} from '../index';
import {useShiftContext} from 'context/ShiftContext';
import {ShiftCardType, ShiftObject} from 'types/commonTypes';
import {formatSimpleTime, minutesToTime, timeDiffBetween} from 'utils/helper';

interface ShiftListType {
  shiftData: any;
  showLabel?: boolean;
}
const ShiftList: React.FC<ShiftListType> = ({shiftData, showLabel = true}) => {
  const {shifts, overlappingList} = useShiftContext();

  const renderSectionHedaer = (title: string) => {
    const currentShiftData = shiftData.filter(
      (item: any) => item.title === title,
    );
    let totalTimeInMinutes = 0;
    const slotsAvailable = currentShiftData[0]?.data;
    const noOfShift = slotsAvailable?.length;
    if (noOfShift > 0 && !showLabel) {
      totalTimeInMinutes = slotsAvailable
        .map((id: number) =>
          timeDiffBetween(shifts[id].startTime, shifts[id].endTime),
        )
        .reduce((total: any, hours: any) => total + hours);
    }
    if (noOfShift <= 0) return null;
    return (
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionTitleText}>{title}</Text>
        {noOfShift > 0 && !showLabel && (
          <Text style={styles.shiftTitleText}>
            {`${noOfShift} ${
              noOfShift > 0 ? 'shifts, ' : 'shift, '
            }${minutesToTime(totalTimeInMinutes)}`}
          </Text>
        )}
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
          const timeStamp = formatSimpleTime(
            shiftData?.startTime,
            shiftData?.endTime,
          );
          const isOverlapped = overlappingList?.includes(item);
          return (
            <ShiftCard
              time={timeStamp}
              area={shiftData?.area}
              booked={isOverlapped ? false : shiftData?.booked}
              isOverlapping={isOverlapped}
              showLabel={showLabel}
              shiftIndex={item}
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
