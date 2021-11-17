const express = require("express");
require("express-async-errors");

const { CosmosDbService: _cosmosDbService } = require("./services");
const config = require("./config");

const app = express();

app.use(express.json());

async function findById(id) {
  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @id",
    parameters: [
      {
        name: "@id",
        value: id,
      },
    ],
  };

  const { resources } = await _cosmosDbService.container.items
    .query(querySpec)
    .fetchAll();

  return resources;
}

app.get("/", async (req, res) => {
  const querySpec = {
    query: "SELECT * from c",
  };

  const { resources: items } = await _cosmosDbService.container.items
    .query(querySpec)
    .fetchAll();

  return res.send({ success: true, data: items });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await findById(id);

  if (result.length === 0) {
    return res.status(404).send({
      success: false,
      message: "Resource not found",
    });
  }

  return res.send({ success: true, data: result[0] });
});

app.post("/", async (req, res) => {
  const { body } = req;
  body.id = Date.now().toString();

  await _cosmosDbService.container.items.create(body);

  return res.send({ success: true, data: body });
});

app.patch("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const result = await findById(id);

  if (result.length === 0) {
    return res.status(404).send({
      success: false,
      message: "Resource not found",
    });
  }

  body.id = id;

  await _cosmosDbService.container.item(id, result[0].category).replace(body);

  return res.status(204).send();
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await findById(id);

  if (result.length === 0) {
    return res.status(404).send({
      success: false,
      message: "Resource not found",
    });
  }

  await _cosmosDbService.container.item(id, result[0].category).delete();

  return res.status(204).send();
});

app.use((req, res) => {
  return res.status(404).send({
    success: false,
    message: "Resource not found",
  });
});

app.use((err, req, res, next) => {
  const { message } = err;

  return res.status(500).send({
    success: false,
    message,
  });
});

app.listen(config.port, () => {
  console.log(`Application up and running on port ${config.port} 🚀`);
});
