# Saga Token-gated Mobile DApp

This demo is adapted from [Solana Mobile DApp Scaffold](https://github.com/solana-mobile/solana-mobile-dapp-scaffold) for the tutorial Token-gating Saga Genesis Token. This demo is a mobile dApp development tutorial using Helius DAS API and React Native to token-gate a collection. Follow the tutorial on the [Helius Blog](https://www.helius.dev/blog).

## Getting Started
### Environment Set Up
Install v20.9.0 [NodeJS](https://nodejs.org/en/download) to use yarn.

Install the [Android SDK](https://developer.android.com/tools/variables#android_home) tool and set the ANDROID_HOME variable.

Configure a Saga/Android for mobile development: In settings, tap the Build Number option 7 times until the ‘You are now a developer!’ pop-up is visible. Search and enable Developer Options and enable USB Debugging in the same dropdown.
### Install and Run
Open the repository in a code editor and bring up a terminal.

    cd app/
Install the app in the app directory.

    yarn
Make sure your phone is connected with USBC, debugging is turned on, and run the following command.

    yarn react-native run-android

### Set-up Token-gating with DAS API
To set up token-gating with the DAS API, head to [util/findSagaGenesisToken.ts](https://github.com/helius-labs/saga-token-gating-tutorial/blob/main/app/util/findSagaGenesisToken.ts) and populate your Helius API key. Heads up, the request will not work without an API key, get one for free [here](https://helius.dev).
