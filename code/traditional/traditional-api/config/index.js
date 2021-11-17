if (process.env["NODE_ENV"] !== "production") {
  require("dotenv").config();
}

const config = {
  port: process.env["PORT"] || 3000,
  endpoint: process.env["COSMOSDB_ENDPOINT"],
  key: process.env["COSMOSDB_AUTH_KEY"],
  databaseId: "SaveMoneyServerless",
  containerId: "Product",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

module.exports = config;
