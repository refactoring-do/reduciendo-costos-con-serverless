import { AzureFunction, Context } from "@azure/functions";
import axios from "axios";

const blobTrigger: AzureFunction = async function (
  context: Context,
  myBlob: any
): Promise<void> {
  context.log(
    "Blob trigger function processed blob \n Name:",
    context.bindingData.filename,
    "\n Blob Size:",
    myBlob.length,
    "Bytes"
  );
  const endpoint =
    process.env["COMPUTER_VISION_API_URL"] +
    "/vision/v3.2/analyze?visualFeatures=Tags&language=en&model-version=latest";
  const apiKey = process.env["COMPUTER_VISION_API_KEY"];

  try {
    const { data } = await axios.post(endpoint, myBlob, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    });

    context.bindings.outputDocument = JSON.stringify(data);
  } catch (ex) {
    context.log.error(ex.message);
  }
};

export default blobTrigger;
