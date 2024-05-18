import React, {Fragment, useState} from 'react';
import {SafeAreaView, SectionList, Text, View} from 'react-native';

import styles from './ShiftListStyle';
import {ShiftCard} from '../index';

interface ShiftListType {
  shiftData: any;
}
const ShiftList: React.FC<ShiftListType> = ({shiftData}) => {

  const renderSectionHedaer = (title: string, totalShiftTime?: string) => {
    return (
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionTitleText}>{title}</Text>
        <Text style={styles.shiftTitleText}>{title}</Text>
      </View>
    );
  };

  return (
    <View>
      <SectionList
        sections={shiftData}
        keyExtractor={(item, index) => item.time}
        renderItem={({item}) => (
          <ShiftCard
            time={item?.time}
            area={item?.area}
            booked={item?.booked}
            isOverlapping={item?.isOverlapping}
          />
        )}
        renderSectionHeader={({section: {title}}) => renderSectionHedaer(title)}
        ItemSeparatorComponent={({}) => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

export default ShiftList;
