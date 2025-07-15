// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  text: { fontSize: 24 },
});
