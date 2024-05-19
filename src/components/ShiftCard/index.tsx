import React, {Fragment} from 'react';
import {Text, View} from 'react-native';

import styles from './ShiftCardStyle';
import {CustomButton} from '../index';
import {ShiftCardType} from 'types/commonTypes';
import {useApi} from '../../hooks';

const ShiftCard: React.FC<ShiftCardType> = ({
  time,
  area,
  booked = false,
  isOverlapping = false,
  isDisable = false,
  showLabel = false,
  shiftIndex,
  onhandleBook = () => {},
  onhandleCancel = () => {},
}) => {
  const {data, loading, error, bookShift, cancelShift} = useApi<any>();

  const onClickItem = () => {
    // if (booked) onhandleCancel();
    // else if (isOverlapping) return;
    // else onhandleBook();

    if (booked) cancelShift(shiftIndex);
    else if (isOverlapping) return;
    else bookShift(shiftIndex);
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.sectionLeft}>
        <Text style={styles.timeText}>{time}</Text>
        {!showLabel && area && <Text style={styles.countryText}>{area}</Text>}
      </View>
      {/* <Text>{JSON.stringify(loading)}</Text> */}

      <View style={styles.sectionMid}>
        {showLabel && (
          <Fragment>
            {isOverlapping && (
              <Text style={styles.overlappingText}>Overlapping</Text>
            )}
            {booked && <Text style={styles.bookedText}>Booked{showLabel}</Text>}
          </Fragment>
        )}
      </View>

      <View style={styles.sectionRight}>
        <CustomButton
          title={booked ? 'Cancel' : 'Book'}
          variant={
            booked ? 'cancelled' : isOverlapping ? 'disabled' : 'primary'
          }
          onPress={onClickItem}
          disabled={isOverlapping}
          isLoading={loading}
        />
      </View>
    </View>
  );
};

export default ShiftCard;
