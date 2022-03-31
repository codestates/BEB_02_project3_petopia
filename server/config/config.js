const dotenv = require("dotenv");

dotenv.config();

const {PORT, DATABASE_URL, RPCURL, KAS_ACCESS_KEY, KAS_SECRET_KEY, KAS_TOKEN_ADDR} = process.env;

module.exports ={
    port: PORT,
    databaseUrl: DATABASE_URL,
    rpcURL: RPCURL,
    kasAccessKey: KAS_ACCESS_KEY,
    kasSecretKey: KAS_SECRET_KEY,
    kasTokenAddr: KAS_TOKEN_ADDR
}