#! /usr/bin/env node

const { addTimestamp } = require('./timestamp.js');
const { addBorder } = require('./border.js');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Usage: film <input_folder> <output_folder>');
  process.exit(1);
}

addBorder(args[0], args[1]);
