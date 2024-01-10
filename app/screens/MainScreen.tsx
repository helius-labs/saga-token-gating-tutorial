import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import findSagaGenesisToken from '../util/findSagaGenesisToken';
import { useAuthorization } from '../components/providers/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';
import { Colors } from '../components/Colors';


export default function MainScreen() {
  const {authorizeSession} = useAuthorization();
  const {deauthorizeSession} = useAuthorization();
  const [verified, setVerified] = useState<boolean | undefined>();

  const handleConnectPress = useCallback(async () => {
        await transact(async wallet => {
        const { publicKey } = await authorizeSession(wallet);
        const result = await findSagaGenesisToken(publicKey);

        if (result.length > 0) {
          setVerified(true);
        }
      });
  }, [authorizeSession]);

  if (verified === true) {
    return (
      <>
      <View style={styles.mainContainer}>
        <Image source={require('../img/verified.jpg')} style={styles.image} />
        <Text style={styles.title}>Verified Ownership of Saga Genesis Token</Text>
        <Pressable onPress={() => {
          transact(wallet => {
            deauthorizeSession(wallet);
          });
        }}
        style={styles.button}>
          <Text style={styles.text}>Disconnect</Text>
        </Pressable>
      </View>
    </>
    )
  } else if (verified === false) {
    return (
      <>
      <View style={styles.mainContainer}>
        <Image source={require('../img/rejected.png')} style={styles.image}  />
        <Text style={styles.text}>No Saga Genesis Token Found</Text>
        <Pressable onPress={() => {
          transact(wallet => {
            deauthorizeSession(wallet);
          });
        }}
        style={styles.button}>
          <Text style={styles.text}>Disconnect</Text>
        </Pressable>
      </View>
    </>
    )
  } else {
    return (
      <>
        <View style={styles.mainContainer}>
          <Image source={require('../img/placeholder.png')} style={styles.image}  />
          <Pressable onPress={handleConnectPress} style={styles.button}>
            <Text style={styles.text}>Connect</Text>
          </Pressable>
        </View>
      </>
    )
  }  
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 32,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 24,
  },
  scrollContainer: {
    height: '100%',
  },
  button: {
    width: 200,
    height: 48,
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 24
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  }
});
