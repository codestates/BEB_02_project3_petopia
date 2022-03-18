import { InjectedConnector } from '@web3-react/injected-connector'

// network chain id : mainnet(1), ropsten(3), rinkeby(4), localhost(1337)
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 1337]
});
