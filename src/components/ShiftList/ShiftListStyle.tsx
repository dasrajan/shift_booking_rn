import {StyleSheet} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.borderColor,
  },
  sectionHeaderWrapper: {
    flex: 1,
    alignItems:'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 60,
    backgroundColor: colors.blueTint4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  sectionTitleText:{
    fontSize: 16,
    color: colors.blueTint1,
    fontWeight:'bold'
  },
  shiftTitleText:{
    fontSize: 16,
    color: colors.blueTint2,
    marginLeft: 10
  }
});
