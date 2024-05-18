import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from 'styles/colors';

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  children,
}: any) => {
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.tabButtonMain}
            key={index}>
            <Text
              style={[
                styles.tabButtonLabel,
                {
                  color: isFocused ? colors.primaryBlue : colors.bottomTextColor,
                  fontWeight: isFocused ? '700' : '500',
                },
              ]}
              numberOfLines={1}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: colors.primaryGray,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
  tabButtonMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonLabel: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 14,
  },
});
