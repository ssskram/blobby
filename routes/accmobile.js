const express = require("express");
const router = express.Router();
const azureStorage = require("azure-storage");
const blobService = azureStorage.createBlobService();
const getStream = require("into-stream");
const containerName = "accmobile";

// post image to accmobile container
router.post("/image", (req, res) => {
  const blobName = req.query.filename;
  const stream = getStream(req.files.file.data);
  const streamLength = req.files.file.data.length;
  blobService.createBlockBlobFromStream(
    containerName,
    blobName,
    stream,
    streamLength,
    error => {
      if (!error) {
        res.status(200).send();
      } else res.status(500).send(error);
    }
  );
});

// remove image from container
router.get("/deleteImage", (req, res) => {
  const blobName = req.query.blobName;
  blobService.deleteBlob(containerName, blobName, {}, error => {
    if (!error) {
      res.status(200).send();
    } else res.status(500).send(error);
  });
});

module.exports = router;
