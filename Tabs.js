// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Next from './Next';
import CustomBar from './customBar';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Next" component={Next} />
    </Tab.Navigator>
  );
}
