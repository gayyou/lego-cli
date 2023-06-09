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
exports.callPrompt = exports.unzip = exports.execCmd = exports.resolveApp = void 0;
const compressing_1 = __importDefault(require("compressing"));
const execa_1 = __importDefault(require("execa"));
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const resolveApp = function (relativePath) {
    const appDirectory = (0, fs_extra_1.realpathSync)(process.cwd());
    return path_1.default.resolve(appDirectory, relativePath);
};
exports.resolveApp = resolveApp;
const execCmd = (cmd) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, execa_1.default)(cmd[0], cmd.slice(1), {
        stdio: "inherit"
    });
});
exports.execCmd = execCmd;
const unzip = (source, targetDir) => __awaiter(void 0, void 0, void 0, function* () {
    return compressing_1.default.zip.decompress(source, targetDir);
});
exports.unzip = unzip;
const prompt = inquirer_1.default.createPromptModule();
function callPrompt(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(options)) {
            return prompt([options]);
        }
        return prompt(options);
    });
}
exports.callPrompt = callPrompt;
//# sourceMappingURL=index.js.map