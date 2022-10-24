#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const piexif = require('piexifjs');

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function addTimestamp(inputDir, outputDir = 'output', origDate) {
  let date = origDate ? new Date(origDate) : new Date();
  const regex = new RegExp('.*.(jpg|JPG)', 'g');
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.match(regex))
    .reverse();

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  files.forEach((file) => {
    const img = fs.readFileSync(path.join(inputDir, file)).toString('binary');
    const oldExif = piexif.load(img);

    const newExif = {
      '0th': { ...oldExif['0th'] },
      Exif: { ...oldExif['Exif'] },
      GPS: { ...oldExif['GPS'] },
      Interop: { ...oldExif['Interop'] },
      '1st': { ...oldExif['1st'] },
      thumbnail: oldExif['thumbnail'],
    };

    var dateStr = formatDate(date);

    newExif['0th'][306] = dateStr;
    newExif['Exif'][piexif.ExifIFD.DateTimeOriginal] = dateStr;
    newExif['Exif'][piexif.ExifIFD.DateTimeDigitized] = dateStr;

    const newExifBytes = piexif.dump(newExif);
    const newImg = piexif.insert(newExifBytes, img);

    fs.writeFileSync(path.join(outputDir, file), newImg, 'binary');

    date.setSeconds(date.getSeconds() - 1);
  });
}

module.exports = {
  addTimestamp,
};
