const {kasAccessKey, kasSecretKey, kasTokenAddr, chainId, accessKeyId, secretAccessKey} = require('../config/config');
const Caver = require('caver-js');
const CaverExtKAS = require('caver-js-ext-kas');

const transaction = async(toAddress) => {
    const caver = new Caver('https://api.baobab.klaytn.net:8651/');
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

const getTxHistory = async(address) => {
    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);
    const query = {
        kind : [caver.kas.tokenHistory.queryOptions.kind.FT],
        size : 100,
        caFilter : kasTokenAddr
    }
    try {
        return await caver.kas.tokenHistory.getTransferHistoryByAccount(address, query);
    } catch (error) {
        throw Error(error);
    }
    
}

module.exports = {
    transaction,
    getTxHistory
}