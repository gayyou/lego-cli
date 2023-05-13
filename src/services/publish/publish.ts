import {callPrompt, execCmd, resolveApp} from "../../utils";
import prompts, {Type} from './prompt';
import { writeJSONSync } from 'fs-extra';
import semver from 'semver';

export async function publish() {
  // 1. 通过对话方式获取更新版本
  const { type, reason } = await callPrompt(prompts);
  const pkgJson = require(resolveApp('package.json'))
  let version = pkgJson?.version || '';

  if (type === Type.NEXT) {
    version = semver.inc(version, 'prerelease');
  } else {
    version = semver.inc(version, reason) as string;
  }

  pkgJson.version = version;
  writeJSONSync(resolveApp('package.json'), pkgJson, {
    spaces: 2
  });

  // 2. 调用发布命令发布代码包
  await execCmd(['npm', 'publish', `--tag=${type}`]);
}
