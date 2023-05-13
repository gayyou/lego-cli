// ./src/services/create.ts
import {readJSONSync, realpath, writeJSONSync, copy, rm} from 'fs-extra';
import {callPrompt, execCmd, unzip} from "../../utils";
import {prompts} from './prompt';
import path from "path";

async function initTemplate(projectPath: string, {name, desc, author}: { name: string; author: string; desc: string }) {
  // 1. 解压代码
  await unzip(path.resolve(__dirname, `../../../templates/react.zip`), projectPath);
  // 2. 移动代码
  await copy(path.resolve(projectPath, 'react'), projectPath, {
    recursive: true
  });
  await rm(path.resolve(projectPath, 'react'), {
    recursive: true
  });

  // 3. 填充信息
  const pkgJsonAddress = path.resolve(projectPath, 'package.json');
  const pkgJson = readJSONSync(pkgJsonAddress);

  Object.assign(pkgJson, {
    name: `@lego-component/${name}`,
    author,
    description: desc,
  });

  writeJSONSync(pkgJsonAddress, pkgJson, {
    spaces: 2
  });
}

export async function create() {
  // 1. 获取用户填写信息
  const {name, author, desc} = await callPrompt(prompts);

  // 2. 解压拷贝文件
  const currentPath = await realpath(process.cwd());
  const projectPath = `${currentPath}/${name}`;

  console.log('init template...');
  await initTemplate(projectPath, {
    name,
    author,
    desc
  });
  console.log(`> cd ${name}`);
  process.chdir(projectPath);

  // 3. 安装依赖
  console.log('install...');
  await execCmd(['npm', 'install']);
}
