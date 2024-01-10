import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from './Colors';

export function Header() {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>SAGA HOLDERS ONLY!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.primary,
    paddingBottom: 24,
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  logo: {
    overflow: 'visible',
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
