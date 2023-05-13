const publishTypeChoice = {
  type: 'list',
  message: '请选择发布类型',
  name: 'type',
  choices: [
    { name: '线上版本', value: Type.LATEST, key: '1' },
    { name: '测试版本', value: Type.NEXT, key: '2' },
  ],
};

export enum Type {
  LATEST = 'latest',
  NEXT = 'next',
}

export enum VersionChangeValue {
  major = 'major',
  minor = 'minor',
  patch = 'patch',
}

const versionChangeTypePrompt = {
  type: 'list',
  name: 'reason',
  message: '请选择变更原因',
  when({ type }: { type: Type }) {
    return type === Type.LATEST;
  },
  choices: [
    {
      name: 'patch: 本次修改涉及向下兼容的问题修正',
      value: VersionChangeValue.patch,
      key: '3',
    },
    {
      name: 'minor: 本次修改涉及乡下兼容的功能新增',
      value: VersionChangeValue.minor,
      key: '2',
    },
    {
      name: 'major: 本次修改涉及不向下兼容的API修改',
      value: VersionChangeValue.major,
      key: '1',
    },
  ],
};

export default [
  publishTypeChoice,
  versionChangeTypePrompt,
]
