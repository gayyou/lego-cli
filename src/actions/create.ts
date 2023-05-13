import program from "./prog";
import {create} from "../services";

program.command('create')
  .example('lego create demo')
  .describe('Create component project')
  .action(async () => {
    await create();
  });
