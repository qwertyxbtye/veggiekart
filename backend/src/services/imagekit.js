const ImageKit = require("@imagekit/nodejs");
const fs = require("fs");

async function getImageUrl(file) {

  const client = new ImageKit({
    privateKey: process.env["IMGKIT"], // This is the default and can be omitted
  });

  const response = await client.files.upload({
    file: fs.createReadStream(file.path),
    fileName: file.originalname,
  });

  return response
}

module.exports = getImageUrl

