const containerClient = require("../config/azureStorage");

const uploadToAzure = async (fileBuffer, fileName, mimeType) => {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimeType,
    },
  });

  return blockBlobClient.url;
};

module.exports = uploadToAzure;