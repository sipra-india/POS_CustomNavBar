import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const TAB_COUNT = 2;
const TAB_WIDTH = width / TAB_COUNT;
const CIRCLE_SIZE = 70;

export default function CustomBar({ state, descriptors, navigation }) {
  const activeIndex = state.index;
  const translateX = useRef(
    new Animated.Value(activeIndex * TAB_WIDTH)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: activeIndex * TAB_WIDTH,
      duration: 300,
      useNativeDriver: true, // set to true for better performance
    }).start();
  }, [activeIndex]);

  const animatedCircleStyle = {
    transform: [
      {
        translateX: Animated.multiply(translateX, 1).interpolate({
          inputRange: [0, width],
          outputRange: [
            TAB_WIDTH / 2 - CIRCLE_SIZE * 1.5,
            width + TAB_WIDTH / 2 - CIRCLE_SIZE * 1.5,
          ],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.wrapper}>
      {/* Animated Circle Background */}
      <Animated.View style={[styles.movingCircleLeftA, animatedCircleStyle]} />
      <Animated.View style={[styles.movingCircleLeftB, animatedCircleStyle]} />
      <Animated.View style={[styles.movingCircle, animatedCircleStyle]} />
      <Animated.View style={[styles.movingCircleRightA, animatedCircleStyle]} />
      <Animated.View style={[styles.movingCircleRightB, animatedCircleStyle]} />

      {/* Icon Buttons */}
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;
          const translateY = useRef(new Animated.Value(0)).current;

          useEffect(() => {
            Animated.timing(translateY, {
              toValue: isFocused ? -25 : 0, // Lift up if focused
              duration: 200,
              useNativeDriver: true,
            }).start();
          }, [isFocused]);

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

          const icon = label === 'Home' ? '🏠' : '🛒';

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.button}
              activeOpacity={0.9}>
              <Animated.Text style={[styles.icon, { transform: [{ translateY }] }]}>
                {icon}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginTop: -15,
    fontSize: 28,
    color: '#777',
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 10,
  },
  activeIcon: {
    transform: [{ translateY: -6 }],
    color: '#222',
  },
  movingCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: 40,
    marginLeft: CIRCLE_SIZE,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'white',
    zIndex: 0,
    elevation: 5,
    paddingTop: 15,
  },
  movingCircleRightA: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE - 30 ,
    borderBottomLeftRadius: CIRCLE_SIZE / 2,
    borderBottomRightRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'white',
    marginLeft: CIRCLE_SIZE * 2,
    elevation: 5,
    zIndex: 0,
  },
  movingCircleRightB: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE- 25,
    borderRadius: CIRCLE_SIZE / 4.5,
    borderTopRightRadius: 0,
    backgroundColor: '#f0f0f0',
    marginLeft: CIRCLE_SIZE * 2,
    elevation: 5,
    zIndex: 0,
  },
  movingCircleLeftA: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE -20,
    borderBottomLeftRadius: CIRCLE_SIZE,
    borderBottomRightRadius: CIRCLE_SIZE,
    backgroundColor: 'white',
    marginRight: CIRCLE_SIZE,
    elevation: 5,
    zIndex: 0,
  },
  movingCircleLeftB: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE-15,
    borderRadius: CIRCLE_SIZE / 4.5,
    borderTopLeftRadius: 0,
    backgroundColor: '#f0f0f0',
    marginRight: CIRCLE_SIZE,
    elevation: 5,
    zIndex: 0,
  },
});
