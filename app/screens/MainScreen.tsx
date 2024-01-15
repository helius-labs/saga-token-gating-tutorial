import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import findSagaGenesisToken from '../util/findSagaGenesisToken';
import {useAuthorization} from '../components/providers/AuthorizationProvider';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {Colors} from '../components/Colors';

export default function MainScreen() {
  const {authorizeSession, deauthorizeSession} = useAuthorization();
  const [verified, setVerified] = useState<boolean | undefined>();

  // Checks if the user's wallet has a Saga Genesis Token
  const handleConnectPress = useCallback(async () => {
    return await transact(async (wallet: Web3MobileWallet) => {
      const {publicKey} = await authorizeSession(wallet);

      const message = 'Confirm that you own this wallet.';
      const messageBuffer = new Uint8Array(
        message.split('').map(c => c.charCodeAt(0)),
      );

      const signedMessages = await wallet.signMessages({
          addresses: [publicKey.toBase58()],
          payloads: [messageBuffer],
      });

      if (signedMessages.length > 0) {
        const result = await findSagaGenesisToken(publicKey);

        // Checks that user has exactly 1 Saga Genesis Token
        if (result.length === 1) {
          setVerified(true);
        } else {
          setVerified(false);
        }  
      } else {
        setVerified(false);
      }
    });
  }, [authorizeSession]);

  if (verified === true) {
    return (
      <>
        <Image
          source={require('../img/gradient.png')}
          style={styles.background}
        />
        <View style={styles.mainContainer}>
          <Image
            source={require('../img/token_colored.png')}
            style={styles.image}
          />
          <Text style={styles.text}>1 Saga Genesis Token Required</Text>
          <View style={styles.token_container}>
            <Text style={styles.title}>Status: </Text>
            <Text style={styles.verifiedTitle}>Verified</Text>
          </View>

          <Pressable
            onPress={() => {
              transact(wallet => {
                deauthorizeSession(wallet);
                setVerified(undefined);
              });
            }}
            style={styles.disconnectButton}>
            <Text style={styles.title}>Disconnect</Text>
          </Pressable>
          <View style={styles.footer}>
            <Text style={styles.text}>Made with</Text>
            <Image
              source={require('../img/helius_logotype.png')}
              style={styles.logo}
            />
          </View>
        </View>
      </>
    );
  } else if (verified === false) {
    return (
      <>
        <Image
          source={require('../img/gradient.png')}
          style={[styles.background, {opacity: 0.25}]}
        />
        <View style={styles.mainContainer}>
          <Image source={require('../img/tokenbw.png')} style={styles.image} />
          <Text style={styles.text}>1 Saga Genesis Token Required</Text>
          <View style={styles.token_container}>
            <Text style={styles.title}>Status: </Text>
            <Text style={styles.unverifiedTitle}>No Token Found</Text>
          </View>
          <Pressable
            onPress={() => {
              transact(wallet => {
                deauthorizeSession(wallet);
                setVerified(undefined);
              });
            }}
            style={styles.disconnectButton}>
            <Text style={styles.title}>Disconnect</Text>
          </Pressable>
          <View style={styles.footer}>
            <Text style={styles.text}>Made with</Text>
            <Image
              source={require('../img/helius_logotype.png')}
              style={styles.logo}
            />
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <Image
          source={require('../img/gradient.png')}
          style={[styles.background, {opacity: 0.25}]}
        />
        <View style={styles.mainContainer}>
          <Image source={require('../img/tokenbw.png')} style={styles.image} />
          <Text style={styles.text}>1 Saga Genesis Token Required</Text>
          <View style={styles.token_container}>
            <Text style={styles.title}>Status: </Text>
            <Text style={styles.title}>Waiting to Connect</Text>
          </View>

          <Pressable onPress={handleConnectPress} style={styles.button}>
            <Text style={styles.title}>Connect</Text>
          </Pressable>
          <View style={styles.footer}>
            <Text style={styles.text}>Made with</Text>
            <Image
              source={require('../img/helius_logotype.png')}
              style={styles.logo}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 32,
    flex: 1,
    alignItems: 'center',
    gap: 24,
  },
  background: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  token_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  button: {
    width: 300,
    height: 48,
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  disconnectButton: {
    width: 300,
    height: 48,
    backgroundColor: Colors.gray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit',
  },
  title: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit',
  },
  verifiedTitle: {
    fontSize: 24,
    color: Colors.green,
    textAlign: 'center',
    fontFamily: 'OutfitBold',
  },
  unverifiedTitle: {
    fontSize: 24,
    color: Colors.red,
    textAlign: 'center',
    fontFamily: 'OutfitBold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 24,
  },
  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 75,
  },
  token: {
    width: 100,
    height: 100,
  },
});
