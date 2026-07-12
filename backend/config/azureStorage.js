const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = new BlobServiceClient(
  process.env.AZURE_BLOB_SAS_URL
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER_NAME
);

module.exports = containerClient;