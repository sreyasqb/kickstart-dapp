const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const {mnemonic,url}=require('./credentials.js');
const provider = new HDWalletProvider(
  mnemonic,
  url
);
//0x648182A1dad64503182516c69e22Cd18F21439e8
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  // console.log(accounts);

  console.log('Attempting to deploy from account', accounts[0]);
  
  const result = await new web3.eth.Contract(compiledFactory.CampaignFactory.abi)
    .deploy({ data: compiledFactory.CampaignFactory.evm.bytecode.object })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
//   console.log(abi);
  provider.engine.stop();
};
deploy();