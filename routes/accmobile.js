const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const checkToken = require('../token')
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({
  storage: inMemoryStorage
}).single('image')
const azureStorage = require('azure-storage')
const blobService = azureStorage.createBlobService()
const getStream = require('into-stream')
const containerName = 'accmobile'
global.Headers = fetch.Headers

// post image to accmobile container
router.post('/image', uploadStrategy, (req, res) => {
  const valid = (checkToken(req.token))
  if (valid == true) {
    const blobName = getBlobName(req.file.originalname)
    const stream = getStream(req.file.buffer)
    const streamLength = req.file.buffer.length
    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, error => {
      if (!error) {
        res.status(200).send()
      } else res.status(500).send(error)
    })
  } else res.status(403).end()
})

module.exports = router