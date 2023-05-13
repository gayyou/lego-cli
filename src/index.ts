import sade, {Sade} from 'sade';

const prog = sade('lego');

prog.command('create <name>')
  .describe('Create a component project')
  .option('-t, --type', 'JavaScript or TypeScript', 'typescript')
  .example('build src build --global --config my-conf.js')
  .example('build app public -o main.js')
  .action((name, opts) => {
    console.log(`> create component name ${name}`);
    console.log('> these are extra opts', opts);
  });

prog.parse(process.argv);
