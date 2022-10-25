const fs = require('fs');
const path = require('path');
const piexif = require('piexifjs');
const { Canvas, Image } = require('skia-canvas');

function addBorder(inputDir, outputDir = 'border', marginPercentage = 0.05) {
  const regex = new RegExp('.*.(jpg|JPG)', 'g');
  const files = fs.readdirSync(inputDir).filter((file) => file.match(regex));

  if (!fs.existsSync(path.join(inputDir, outputDir)))
    fs.mkdirSync(path.join(inputDir, outputDir));

  files.forEach((file) => {
    const image = fs.readFileSync(path.join(inputDir, file)).toString('binary');
    const exif = piexif.load(image);

    const imgWidth = exif['0th'][piexif.ImageIFD.ImageWidth] ?? 2048;
    const imgHeight = exif['0th'][piexif.ImageIFD.ImageLength] ?? 3089;

    const width =
      Math.max(imgWidth, imgHeight) * 0.05 * 2 + Math.max(imgWidth, imgHeight);

    const canvas = new Canvas(width, width);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, width);

    const img = new Image();
    img.onload = () =>
      ctx.drawImage(img, width / 2 - imgWidth / 2, width / 2 - imgHeight / 2);
    img.src = path.join(inputDir, file);

    canvas.saveAsSync(path.join(inputDir, outputDir, file));
  });
}

module.exports = { addBorder };
