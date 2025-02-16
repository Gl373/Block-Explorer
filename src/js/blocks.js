import { createPublicClient, http, formatEther } from 'https://esm.sh/viem';
import { localhost } from 'https://esm.sh/viem/chains';

const client = createPublicClient({
  chain: localhost,
  transport: http('http://127.0.0.1:7545'),
});

// Visa alla blocks
const listBlocks = async () => {
  const blocksList = document.getElementById('list');
  const totalBlocks = await client.getBlockNumber();

  for (let i = totalBlocks; i >= 0; i--) {
    // Hämta block med transaktionsdata
    const block = await client.getBlock({
      blockNumber: i,
      includeTransactions: true,
    });

    // Skapa HTML element för blocket
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block-card');

    blockDiv.innerHTML = `
    <div class="block-header">
        <h3>Block #${block.number}</h3>
        <span class="block-arrow">↓</span>
    </div>
    <div class="block-details">
        <p><strong>Block Hash:</strong> ${block.hash}</p>
        <p><strong>Timestamp:</strong> ${new Date(
          parseInt(block.timestamp * 1000n)
        ).toLocaleString()}</p>
        <p><strong>Gas Used:</strong> 21000</p>
        <p><strong>Transactions:</strong> ${block.transactions.length}</p>
        ${block.transactions
          .map(
            (tx) => `
            <div class="transaction-details">
                <p><strong>TX Hash:</strong> ${tx.hash}</p>
                <p><strong>From:</strong> ${tx.from}</p>
                <p><strong>To:</strong> ${tx.to}</p>
                <p><strong>Value:</strong> ${formatEther(tx.value)} ETH</p>
                <p><strong>Gas Used:</strong> 21000</p>
            </div>
        `
          )
          .join('')}
    </div>
`;

    // Expandering block med pilar
    const arrow = blockDiv.querySelector('.block-arrow');
    arrow.innerHTML = `<i class="fas fa-chevron-down"></i>`;

    arrow.addEventListener('click', () => {
      blockDiv.classList.toggle('expanded');
      arrow.innerHTML = blockDiv.classList.contains('expanded')
        ? `<i class="fas fa-chevron-up"></i>`
        : `<i class="fas fa-chevron-down"></i>`;
    });

    blocksList.appendChild(blockDiv);
  }
};

document.addEventListener('DOMContentLoaded', listBlocks);
