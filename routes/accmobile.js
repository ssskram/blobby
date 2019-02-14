const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const checkToken = require('../token')
const azureStorage = require('azure-storage')
const blobService = azureStorage.createBlobService()
const getStream = require('into-stream')
const containerName = 'accmobile'
global.Headers = fetch.Headers

//post image to accmobile container
router.post('/image', (req, res) => {
  const valid = (checkToken(req.token))
  if (valid == true) {
    const blobName = req.query.filename
    const stream = getStream(req.files.file.data)
    const streamLength = req.files.file.data.length
    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, error => {
      if (!error) {
        res.status(200).send()
      } else res.status(500).send(error)
    })
  } else res.status(403).end()
})

// remove image from container
router.post('/deleteImage', (req, res) => {
  const valid = (checkToken(req.token))
  if (valid == true) {
    const blobName = req.query.filename
    const stream = getStream(req.files.file.data)
    const streamLength = req.files.file.data.length
    blobService.deleteBlobfromStream(containerName, blobName, stream, streamLength, error => {
      if (!error) {
        res.status(200).send()
      } else res.status(500).send(error)
    })
  } else res.status(403).end()
})

module.exports = router