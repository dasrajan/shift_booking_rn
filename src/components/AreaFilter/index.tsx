import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './AreaFilter.style';
import colors from 'styles/colors';

interface AreaFilterType {
  areaList: any;
  handleChange: (city: string) => void;
  active: string;
}

const AreaFilter: React.FC<AreaFilterType> = ({
  areaList = [],
  handleChange,
  active = false,
}) => {
  return (
    <View style={styles.areaContainer}>
      {areaList.map((area: any) => {
        return (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => handleChange(area?.city)}>
            <Text
              style={[
                styles.headerText,
                {
                  color:
                    active === area?.city
                      ? colors.primaryBlue
                      : colors.bottomTextColor,
                },
              ]}>{`${area?.city} (${area?.count})`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AreaFilter;
