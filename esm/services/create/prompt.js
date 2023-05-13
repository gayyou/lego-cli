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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompts = void 0;
const namePrompt = {
    type: 'input',
    name: 'name',
    message: '请输入组件名称',
    validate: (name) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
};
const authorPrompt = {
    type: 'input',
    name: 'author',
    message: '请输入作者',
    validate: (name) => __awaiter(void 0, void 0, void 0, function* () {
        if (name.length === 0) {
            return '作者不能为空';
        }
        return true;
    }),
};
const descPrompt = {
    type: 'input',
    name: 'desc',
    message: '请输入描述',
};
exports.prompts = [
    namePrompt,
    authorPrompt,
    descPrompt,
];
//# sourceMappingURL=prompt.js.map