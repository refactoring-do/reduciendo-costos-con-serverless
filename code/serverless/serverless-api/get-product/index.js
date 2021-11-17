module.exports = async function (context, req, inputDocument) {
  context.log("Get product function triggered");

  if (inputDocument.length === 0) {
    context.res
      .status(404)
      .json({ success: false, message: "Resource not found." })
      .done();
  }

  context.res
    .status(200)
    .json({ success: true, data: inputDocument[0] })
    .done();
};
