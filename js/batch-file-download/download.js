'use strict'

const fs = require('fs')
const axios = require('axios')
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
	retries: 3
});

async function downloadImage (url, fileName) {

  // axios image download with response type "stream"
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // pipe the result stream into a file on disc
  response.data.pipe(fs.createWriteStream(fileName))

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })

    response.data.on('error', () => {
      reject()
    })
  })

}

module.exports = downloadImage;