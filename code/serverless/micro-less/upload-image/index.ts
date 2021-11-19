import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as multipart from "parse-multipart";
import HTTP_CODES from "http-status-enum";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  context.log("Upload HTTP trigger function processed a request.");

  if (!req.body || !req.body.length) {
    context.res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ success: false, message: "Request body is not defined" })
      .done();
  }

  try {
    const bodyBuffer = Buffer.from(req.body);
    const boundary = multipart.getBoundary(req.headers["content-type"]);
    const parts = multipart.Parse(bodyBuffer, boundary);

    if (!parts?.length) {
      context.res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ success: false, message: "File buffer is incorrect" })
        .done();
    }

    const { data } = parts[0];

    context.bindings.outputBlob = data;

    context.res
      .status(HTTP_CODES.OK)
      .json({ success: true, message: "Image uploaded" });
  } catch (err) {
    context.log.error(err.message);

    context.res
      .status(HTTP_CODES.CONFLICT)
      .json({ success: false, message: err.message });
  }

  return context.done();
};

export default httpTrigger;
