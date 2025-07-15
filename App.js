// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs'; // A separate file where we’ll define the custom tab bar

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
