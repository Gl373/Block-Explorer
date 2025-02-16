import { createClient } from '../helpers/explorer.js';

const client = createClient();

// Uppdatera block information
const updateInfo = async () => {
  const blockCount = await client.getBlockNumber();
  document.getElementById('totalBlocks').textContent = blockCount;
};

document.addEventListener('DOMContentLoaded', updateInfo);
