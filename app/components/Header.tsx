import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from './Colors';

export function Header() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../img/saga_genesis_title.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Verify Ownership</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 64,
    width: '100%',
  },
  container: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: Colors.orange,
    fontSize: 48,
    textAlign: 'center',
    fontFamily: 'OutfitSemiBold',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Outfit',
  },
});
