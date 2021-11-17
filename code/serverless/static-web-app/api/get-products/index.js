module.exports = async function (context, req, inputDocument) {
  context.log("Get products function triggered");

  context.res.status(200).json({ success: true, data: inputDocument }).done();
};
