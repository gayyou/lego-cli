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
exports.build = void 0;
const webpack_1 = __importDefault(require("webpack"));
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../../utils");
const defaultConfig = {
    entry: (0, utils_1.resolveApp)('src/index.tsx'),
    output: {
        path: (0, utils_1.resolveApp)('dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    externals: {
        react: 'React'
    },
    mode: process.env.NODE_ENV = 'development' ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ]
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    }
};
function build() {
    return __awaiter(this, void 0, void 0, function* () {
        let webpackConfig;
        const configPath = (0, utils_1.resolveApp)('webpack.config.js');
        if ((0, fs_extra_1.existsSync)(configPath)) {
            webpackConfig = require(configPath);
        }
        else {
            webpackConfig = defaultConfig;
        }
        (0, webpack_1.default)(webpackConfig, (err, result) => {
            if (err) {
                console.error(err);
            }
            console.log(result.toString());
            console.log('编译成功');
        });
    });
}
exports.build = build;
//# sourceMappingURL=build.js.map