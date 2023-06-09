"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.publish = void 0;
const utils_1 = require("../../utils");
const prompt_1 = __importStar(require("./prompt"));
const fs_extra_1 = require("fs-extra");
// @ts-ignore
const semver_1 = __importDefault(require("semver"));
function publish() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. 通过对话方式获取更新版本
        const { type, reason } = yield (0, utils_1.callPrompt)(prompt_1.default);
        const pkgJson = require((0, utils_1.resolveApp)('package.json'));
        let version = (pkgJson === null || pkgJson === void 0 ? void 0 : pkgJson.version) || '';
        if (type === prompt_1.Type.NEXT) {
            version = semver_1.default.inc(version, 'prerelease');
        }
        else {
            version = semver_1.default.inc(version, reason);
        }
        pkgJson.version = version;
        (0, fs_extra_1.writeJSONSync)((0, utils_1.resolveApp)('package.json'), pkgJson, {
            spaces: 2
        });
        // 2. 调用发布命令发布代码包
        yield (0, utils_1.execCmd)(['npm', 'publish', `--tag=${type}`]);
    });
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map