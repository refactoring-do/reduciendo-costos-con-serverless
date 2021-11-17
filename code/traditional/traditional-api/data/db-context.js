const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("../config");

async function create(client, databaseId, containerId) {
  const partitionKey = config.partitionKey;

  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  console.log(`Created database:\n${database.id}\n`);

  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );

  console.log(`Created container:\n${container.id}\n`);
}

module.exports = { create };
