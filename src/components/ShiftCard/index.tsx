import React from 'react';
import {Text, View} from 'react-native';

import styles from './ShiftCardStyle';
import {CustomButton} from '../index';
import {ShiftCardType} from 'types/commonTypes';

const ShiftCard: React.FC<ShiftCardType> = ({
  time,
  area,
  booked = false,
  isOverlapping = false,
  isDisable = false,
  onhandleBook = () => {},
  onhandleCancel = () => {},
}) => {
  const onClickItem = () => {
    if (booked) onhandleCancel();
    else if (isOverlapping) return;
    else onhandleBook();
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.sectionLeft}>
        <Text style={styles.timeText}>{time}</Text>
        {area && <Text style={styles.countryText}>{area}</Text>}
      </View>

      <View style={styles.sectionMid}>
        {isOverlapping && (
          <Text style={styles.overlappingText}>Overlapping</Text>
        )}
        {booked && <Text style={styles.bookedText}>Booked</Text>}
      </View>

      <View style={styles.sectionRight}>
        <CustomButton
          title={booked ? 'Cancel' : 'Book'}
          variant={
            booked ? 'cancelled' : isOverlapping ? 'disabled' : 'primary'
          }
          onPress={onClickItem}
          disabled={isOverlapping}
        />
      </View>
    </View>
  );
};

export default ShiftCard;
