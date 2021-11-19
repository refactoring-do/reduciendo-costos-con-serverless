import { AzureFunction, Context } from "@azure/functions";

const cosmosDBTrigger: AzureFunction = async function (
  context: Context,
  documents: any[]
): Promise<object> {
  if (!!documents && documents.length > 0) {
    const [document] = documents;
    const { tags } = document;
    const tagNames = tags.map((tag: any) => tag.name);

    return {
      personalizations: [
        { to: [{ email: process.env["SEND_GRID_TO_EMAIL"] }] },
      ],
      from: { email: process.env["SEND_GRID_FROM_EMAIL"] },
      subject: "Image Analyzer Information",
      content: [
        {
          type: "text/plain",
          value: `The image contains the followings characteristics: ${tagNames.join(
            ", "
          )}`,
        },
      ],
    };
  }
};

export default cosmosDBTrigger;
