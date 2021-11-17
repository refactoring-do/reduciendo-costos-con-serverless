module.exports = async function (context, req, inputDocument) {
  context.log("Update book function triggered");

  if (inputDocument.length == 0) {
    context.res
      .status(404)
      .json({ success: false, message: "Resource not found." })
      .done();
  }

  const product = inputDocument[0];
  const { name, description, category, price } = req.body;
  const { id } = req.params;

  const updatedProduct = {
    id,
    name: name || product.name,
    description: description || product.description,
    category: category || product.category,
    price: price || product.price,
  };

  context.bindings.outputDocument = JSON.stringify(updatedProduct);

  context.res.status(204).json().done();
};
