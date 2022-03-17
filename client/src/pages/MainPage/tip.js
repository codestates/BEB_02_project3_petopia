import Web3Token from 'web3-token';

// Connection to MetaMask wallet (you can actually use any wallet)
// you can even use ethersjs instead of web3
const web3 = new Web3(ethereum);
await ethereum.enable();

// getting address from which we will sign message
const address = (await web3.eth.getAccounts())[0];

// generating a token with 1 day of expiration time
const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, address), '1d');

// attaching token to axios authorization header
axios.post('/registration', { name: 'Adam' }, {
  headers: {
    'Authorization': token,
  }
})

// checking how it finds me in backend's database
axios.get('/me', {
  headers: {
    'Authorization': token,
  }
})