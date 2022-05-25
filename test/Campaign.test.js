const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  //   web3.eth.getBalance(accounts[0]).then(console.log);
  try {
    factory = await new web3.eth.Contract(compiledFactory.CampaignFactory.abi)
      .deploy({
        data: compiledFactory.CampaignFactory.evm.bytecode.object,
      })
      .send({ from: accounts[0], gas: "1000000" });
  } catch (err) {
    console.log("THIS WAS THE ERROR");
    console.log(err);
    
  }
  //   await factory.methods.createCampaign("100").send({
  //     from: accounts[0],
  //     gas: "1000000",
  //   });

  //   [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  //   campaign = await new web3.eth.Contract(
  //     compiledCampaign.Campaign.evm.bytecode.object,
  //     campaignAddress
  //   );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    //   console.log(factory);
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
