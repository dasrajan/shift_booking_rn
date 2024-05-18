import {StyleSheet} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  areaContainer: {
    width: '100%',
    height: 70,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerButton: {
    flex: 1,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 16,
    color: colors.primaryBlue
  },
});
