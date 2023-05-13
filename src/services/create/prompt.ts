
const namePrompt = {
  type: 'input',
  name: 'name',
  message: '请输入组件名称',
  validate: async (name: string) => {
    if (name.length === 0) {
      return '组件名不能为空';
    }

    if (name[0].charCodeAt(0) < '9'.charCodeAt(0) && name[0].charCodeAt(0) > '0'.charCodeAt(0)) {
      return '组件名不能以数字开头';
    }

    if (!/^[A-Za-z0-9-]+$/.test(name)) {
      return '请输入英文、数字和横线组合名称';
    }

    return true;
  },
};

const authorPrompt = {
  type: 'input',
  name: 'author',
  message: '请输入作者',
  validate: async (name: string) => {
    if (name.length === 0) {
      return '作者不能为空';
    }

    return true;
  },
};

const descPrompt = {
  type: 'input',
  name: 'desc',
  message: '请输入描述',
}

export const prompts = [
  namePrompt,
  authorPrompt,
  descPrompt,
];
