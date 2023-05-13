"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// ./src/services/create.ts
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../../utils");
const prompt_1 = require("./prompt");
const path_1 = __importDefault(require("path"));
const prompt = inquirer_1.default.createPromptModule();
function callPrompt(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(options)) {
            return prompt([options]);
        }
        return prompt(options);
    });
}
function initTemplate(projectPath, { name, desc, author }) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. 解压代码
        yield (0, utils_1.unzip)(path_1.default.resolve(__dirname, `../../../templates/react.zip`), projectPath);
        // 2. 移动代码
        yield (0, fs_extra_1.copy)(path_1.default.resolve(projectPath, 'react'), projectPath, {
            recursive: true
        });
        yield (0, fs_extra_1.rm)(path_1.default.resolve(projectPath, 'react'), {
            recursive: true
        });
        // 3. 填充信息
        const pkgJsonAddress = path_1.default.resolve(projectPath, 'package.json');
        const pkgJson = (0, fs_extra_1.readJSONSync)(pkgJsonAddress);
        Object.assign(pkgJson, {
            name: `@lego-component/${name}`,
            author,
            description: desc,
        });
        (0, fs_extra_1.writeJSONSync)(pkgJsonAddress, pkgJson, {
            spaces: 2
        });
    });
}
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. 获取用户填写信息
        const { name, author, desc } = yield callPrompt(prompt_1.prompts);
        // 2. 解压拷贝文件
        const currentPath = yield (0, fs_extra_1.realpath)(process.cwd());
        const projectPath = `${currentPath}/${name}`;
        console.log('init template...');
        yield initTemplate(projectPath, {
            name,
            author,
            desc
        });
        console.log(`> cd ${name}`);
        process.chdir(projectPath);
        // 3. 安装依赖
        console.log('install...');
        yield (0, utils_1.execCmd)(['npm', 'install']);
    });
}
exports.create = create;
//# sourceMappingURL=create.js.map