import {
  createPublicClient,
  createWalletClient,
  http,
} from 'https://esm.sh/viem';
import { localhost } from 'https://esm.sh/viem/chains';

// Skapa klient för att läsa blockchain data
export const createClient = () => {
  return createPublicClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });
};

// Skapa klient för att skicka transaktioner
export const createWallet = () => {
  return createWalletClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });
};

// Hämta totalt antal blocks
export const getBlockCount = async (client) => {
  try {
    return await client.getBlockNumber();
  } catch (error) {
    console.error('Error getting block count:', error);
    throw error;
  }
};

// Hämta senaste blocket
export const getLatestBlock = async (client) => {
  try {
    const blockNumber = await client.getBlockNumber();
    return await client.getBlock({ blockNumber });
  } catch (error) {
    console.error('Error getting latest block:', error);
    throw error;
  }
};
