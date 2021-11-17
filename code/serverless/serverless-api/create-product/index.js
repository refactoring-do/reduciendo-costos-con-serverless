module.exports = async function (context, req) {
  context.log("Create product function triggered");

  const { name, description, category, price } = req.body;

  const product = {
    id: Date.now().toString(),
    name,
    description,
    category,
    price,
  };

  context.bindings.outputDocument = JSON.stringify(product);

  context.res.status(201).json({ success: true, data: product }).done();
};
