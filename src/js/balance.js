import { formatEther } from 'https://esm.sh/viem';
import { createClient } from '../helpers/explorer.js';

const client = createClient();

// Kontrollera saldo
const checkBalance = async (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value;
  const resultDiv = document.getElementById('balance-result');

  try {
    const balance = await client.getBalance({ address });
    const balanceInEther = formatEther(balance);
    resultDiv.innerHTML = `Balance: ${parseFloat(balanceInEther).toFixed(
      2
    )} ETH`;
  } catch (error) {
    resultDiv.innerHTML = 'Error fetching balance';
  }
};

document
  .getElementById('balance-form')
  .addEventListener('submit', checkBalance);
