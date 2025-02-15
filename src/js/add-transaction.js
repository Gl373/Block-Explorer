import { parseEther } from 'https://esm.sh/viem';
import { createWallet } from '../helpers/explorer.js';

const client = createWallet();

// Skicka transaktion
const sendTransaction = async (e) => {
  e.preventDefault();
  try {
    const from = document.querySelector('#from').value;
    const to = document.querySelector('#to').value;
    const value = document.querySelector('#value').value;

    await client.sendTransaction({
      account: from,
      to: to,
      value: parseEther(value),
    });
    // Tillbaka till Blocks
    location.href = './blocks.html';
  } catch {
    // Felmeddelande: använd punkt, inte komma
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.innerHTML = 'Please use decimal point (.) instead of comma. Example: 0.5';
    document.querySelector('#transaction-form').appendChild(errorDiv);
  }
};

document
  .querySelector('#transaction-form')
  .addEventListener('submit', sendTransaction);