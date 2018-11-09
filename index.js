#!/usr/bin/env node

const program = require('commander');
const generatePDF = require('./src/generatePDF');
const devServer = require('./src/dev');

/**
 * Program Entry
 */
const entry = argv => {
  let isDev = false;
  program
    .version('0.1.1', '-v, --version')
    .usage('<config> <output>')
    .option('-c, --config <file>', 'Path to the config yaml file.', 'puppet')
    .option('-o, --out <file>', 'Path to the output pdf file.', 'output.pdf');

  program
    .command('dev')
    .description(
      'run a development server to render the markup before generating the pdf'
    )
    .action(() => {
      isDev = true;
      console.log('Starting dev server...');
      devServer(program.config).catch(console.log);
    });

  program.parse(argv);

  if (!isDev) {
    const { config, out } = program;
    generatePDF(config, out);
  }
};

entry(process.argv);
