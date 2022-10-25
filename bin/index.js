#! /usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addTimestamp } = require('./timestamp.js');
const { addBorder } = require('./border.js');

yargs(hideBin(process.argv))
  .scriptName('film')
  .usage('$0 <cmd> [args]')
  .command(
    'timestamp [-i inputDir] [-o outputDir]',
    'Add timestamps to images',
    (yargs) => {
      yargs.option('i', {
        alias: 'inputDir',
        type: 'string',
        default: './',
        describe: 'input directory',
      });
      yargs.option('o', {
        alias: 'outputDir',
        type: 'string',
        default: 'timestamped',
        describe: 'output directory',
      });
    },
    function (argv) {
      addTimestamp(argv.inputDir, argv.outputDir);
      console.log('Done! 🎉');
    }
  )
  .command(
    'border [-i inputDir] [-o outputDir] [-m margin]',
    'Add border to images',
    (yargs) => {
      yargs.option('i', {
        alias: 'inputDir',
        type: 'string',
        default: './',
        describe: 'input directory',
      });
      yargs.option('o', {
        alias: 'outputDir',
        type: 'string',
        default: 'bordered',
        describe: 'output directory',
      });
      yargs.option('m', {
        alias: 'margin',
        demandOption: false,
        default: 0.025,
        describe: 'Margin Percentage',
        type: 'number',
      });
    },
    function (argv) {
      addBorder(argv.inputDir, argv.outputDir, argv.margin);
      console.log('Done! 🎉');
    }
  )
  .demandCommand()
  .help().argv;
