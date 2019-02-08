
// facility endpoints used by DPW Maintenance

const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const checkToken = require('../token')

global.Headers = fetch.Headers

// post image to accmobile container
router.post('/image',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      // here
    } else res.status(403).end()
  }
)

module.exports = router