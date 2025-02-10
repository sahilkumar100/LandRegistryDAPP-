import Web3 from 'web3';
import { abi, evm } from './LandRegistry.json'; // ABI and Bytecode from the compiled contract

let web3;
let landRegistry;
let accounts;

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask detected!');
    web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      accounts = await web3.eth.getAccounts();
      console.log('Connected Account:', accounts[0]);
      document.getElementById('connectedAccount').innerText = `Connected Account: ${accounts[0]}`;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Please connect your wallet!');
    }
  } else {
    alert('No Ethereum wallet detected! Install MetaMask or use Ganache.');
  }
}

async function initContract() {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = evm.networks[networkId];
  landRegistry = new web3.eth.Contract(abi, deployedNetwork.address);
}

async function registerLand() {
  const landName = document.getElementById('landName').value;
  await landRegistry.methods.registerLand(landName).send({ from: accounts[0] });
  alert('Land Registered!');
}

window.addEventListener('load', async () => {
  await connectWallet();
  await initContract();
  document.getElementById('registerBtn').addEventListener('click', registerLand);
});
