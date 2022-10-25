#! /usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addTimestamp } = require('./timestamp.js');
const { addBorder } = require('./border.js');

yargs(hideBin(process.argv))
  .scriptName('film')
  .usage('$0 <cmd> [args]')
  .command(
    'timestamp [inputDir] [outputDir]',
    'Add timestamps to images',
    (yargs) => {
      yargs.positional('inputDir', {
        type: 'string',
        default: './',
        describe: 'input directory',
      });
      yargs.positional('outputDir', {
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
    'border [inputDir] [outputDir] [marginPercentage]',
    'Add border to images',
    (yargs) => {
      yargs.positional('inputDir', {
        type: 'string',
        default: './',
        describe: 'input directory',
      });
      yargs.positional('outputDir', {
        type: 'string',
        default: 'bordered',
        describe: 'output directory',
      });
      yargs.positional('marginPercentage', {
        type: 'number',
        default: 0.05,
        describe: 'margin percentage',
      });
    },
    function (argv) {
      addBorder(argv.inputDir, argv.outputDir, argv.marginPercentage);
      console.log('Done! 🎉');
    }
  )
  .demandCommand()
  .help().argv;
