import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: 'center',
  },
  noShiftWrapper:{
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  noShiftText:{
    fontSize: 16,
    fontWeight:'bold',
    color: colors.primaryBlue
  }
});
