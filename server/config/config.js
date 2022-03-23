const dotenv = require("dotenv");

dotenv.config();

const {PORT, DATABASE_URL, ERC721CA, ROPSTEN_NETWORK} = process.env;

module.exports ={
    port: PORT,
    databaseUrl: DATABASE_URL,
    erc721CA: ERC721CA,
    ropstenNetwork: ROPSTEN_NETWORK
}