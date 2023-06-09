import {CliSchemaCommand, Context, MiddlewareNext} from "../types";
import sade, {Sade} from 'sade';
import { resolve } from 'path';

/**
 * 1. 解析用户输入
 * 2. 解析schema
 * 3. 匹配模块并加载对应模块
 * @param context
 * @param next
 */
export default async function parseCommandMiddleware(context: Context, next: MiddlewareNext) {
  const { schema, argv, cli } = context;
  const prog = sade(cli);
  const { commands, description, version } = schema;
  prog.version(version);
  prog.describe(description);

  // traverse schema
  commands.forEach((command) => {
    addProgram(prog, command);
  });

  // start run action
  const runner = prog.parse(argv, {
    lazy: true
  });

  console.log('runner?.hanlder', runner?.handler);
  if (runner?.handler) {
    await runner.handler(runner.args);
  }

  await next();
}

function addProgram(prog: Sade, cliSchemaCommand: CliSchemaCommand) {
  const {examples, action, alias, command, description, options} = cliSchemaCommand;

  prog.command(command);

  if (description) {
    prog.describe(description);
  }

  if (options) {
    for (const option of options) {
      prog.option(option.flag, option.example, option.defaultValue);
    }
  }

  if (alias) {
    prog.alias(...alias);
  }

  if (examples) {
    for (const example of examples) {
      prog.example(example);
    }
  }

  const actionHandle = async (args: any) => {
    try {
      console.log('resolve action', resolve(action));
      // 按需异步加载模块
      const { default: fn } = await import(resolve(action));
      console.log('fn', fn);
      await fn(args);
    } catch (e: unknown) {
      console.error(e);
      throw new Error(`action: ${action} load failed; ${(e as Error).message}`);
    }
  }

  prog.action(actionHandle);
}
