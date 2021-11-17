const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env["COSMOSDB_ENDPOINT"];
const key = process.env["COSMOSDB_AUTH_KEY"];

const databaseName = "SaveMoneyServerless";
const collectionName = "Product";

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req, inputDocument) {
  context.log("Delete product function triggered");

  if (inputDocument.length === 0) {
    context.res
      .status(404)
      .json({ success: false, message: "Resource not found." })
      .done();
  }

  const product = inputDocument[0];

  await client
    .database(databaseName)
    .container(collectionName)
    .item(product.id, product.category)
    .delete();

  context.res.status(204).send().done();
};
