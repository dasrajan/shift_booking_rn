import {StyleSheet} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height:'100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.pinkTint1,
    color: colors.pinkTint1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textButton:{
    color: colors.greenTint1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
});
