import compressing from 'compressing';
import execa from "execa";
import inquirer from "inquirer";
import {realpathSync} from "fs-extra";
import path from "path";

export const resolveApp = function (relativePath) {
  const appDirectory = realpathSync(process.cwd());
  return path.resolve(appDirectory, relativePath);
};

export const execCmd = async (cmd: string[]) => {
  await execa(cmd[0], cmd.slice(1), {
    stdio: "inherit"
  });
};

export const unzip = async (source: string, targetDir: string) => {
  return compressing.zip.decompress(source, targetDir);
}

const prompt = inquirer.createPromptModule();

export async function callPrompt(options: any) {
  if (!Array.isArray(options)) {
    return prompt([options])
  }
  return prompt(options);
}
