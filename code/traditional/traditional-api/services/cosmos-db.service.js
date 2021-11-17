const { CosmosClient } = require("@azure/cosmos");

const config = require("../config");

class CosmosDbService {
  #container = null;

  constructor() {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);

    this.#container = database.container(containerId);
  }

  get container() {
    return this.#container;
  }
}

module.exports = new CosmosDbService();
