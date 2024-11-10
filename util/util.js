import fs from "fs";
import { Jimp } from "jimp"
import axios from "axios"

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer',
        timeout: 3000
      });
      const photoBuffer = Buffer.from(response.data, 'binary');
      const photo = await Jimp.read(photoBuffer);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      photo.resize({ w: 60 }, {h: 60})
      photo.greyscale()
      photo.write(outpath, () => {
          resolve(outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
