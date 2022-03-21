require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

// ERC721 deploy
const erc721abi = require('../../contract/erc721Abi_copy');
const me = '0xd9Eba49d7A8073A779633a838e18589f4edBFe22'; //ropsten

const erc721Contract = new web3.eth.Contract(erc721abi, '0x2ead9cc4a6b8da962412e85c71473870c80dab64');
// const erc721Contract = '0x2ead9cc4a6b8da962412e85c71473870c80dab64';

const totalSupply = erc721Contract.methods.totalSupply().call();

// console.log(totalSupply);

console.log(erc721Contract);

