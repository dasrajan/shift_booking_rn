import {StyleSheet} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 70
  },
  sectionLeft: {
    flex: 1.5,
    justifyContent: 'center',
    alignContent:'center',
    // backgroundColor: colors.blueTint3,
  },
  sectionMid: {
    flex: 0.8,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingRight: 18
  },
  sectionRight: {
    flex: 1,
    justifyContent: 'center',
  },

  //Mid section textstyle
  timeText:{
    fontSize: 18,
    color: colors.blueTint1
  },
  countryText:{
    fontSize: 14,
    color: colors.blueTint2
  },
  overlappingText:{
    fontSize: 14,
    fontWeight:'bold',
    color: colors.pinkTint1
  },
  bookedText:{
    fontSize: 14,
    fontWeight:'bold',
    color: colors.blueTint1
  },
});
