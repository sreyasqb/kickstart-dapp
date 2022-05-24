const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const campaignFactoryPath = path.resolve(
  __dirname,
  "contracts",
  "CampaignFactory.sol"
);
const campaignSource = fs.readFileSync(campaignPath, "utf8");
const campaignFactorySource = fs.readFileSync(campaignFactoryPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: campaignSource,
    },
    "CampaignFactory.sol": {
        content:campaignFactorySource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};


fs.ensureDirSync(buildPath);

var output=JSON.parse(solc.compile(JSON.stringify(input))).contracts;

for (let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace('.sol','')+'.json'),
        output[contract]
    );
}
