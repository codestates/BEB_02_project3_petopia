const {kasAccessKey, kasSecretKey, kasTokenAddr} = require('../config/config');
const Caver = require('caver-js');

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const transaction = async(toAddress) => {
    const amount = 0x8ac7230489e80000;

    // add admin wallet
    const adminKeyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(kasSecretKey));

    // Create KIP7 Instance with TokenAddr
    const kip7 = new caver.kct.kip7(kasTokenAddr);
    
    // Transaction
    kip7.options.from = adminKeyring.address;
    const result = await kip7.transfer(toAddress, amount);

    caver.wallet.remove(kasAccessKey);
    return result.status;
}

module.exports = {
    transaction
}