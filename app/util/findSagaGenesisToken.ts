import {PublicKey} from '@solana/web3.js';

export default async function findSagaGenesisToken(address: PublicKey) {
  // Replace this with the token address to gate for
  const SagaSeed = '46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC';

  // Populate your Helius API key
  const HELIUS_APIKEY = '';
  const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_APIKEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'searchAssets',
      params: {
        ownerAddress: address.toString(),
        grouping: ['collection', SagaSeed],
        page: 1,
        limit: 10,
      },
    }),
  });

  const {result} = await response.json();
  return result.items;
}
