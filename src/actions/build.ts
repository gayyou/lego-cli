import program from "./prog";
import {build} from "../services";

program.command('build')
  .example('lego build')
  .describe('Build project')
  .action(async () => {
    await build();
  });
