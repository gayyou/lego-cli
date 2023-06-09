"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
console.log(chalk_1.default.yellowBright(`
      :::        :::::::::    :::::::::      :::::::::
     :+:        :+:          :+:            :+:   :+:
    +:+        +:+          +:+            +:+   +:+
   +#+        +#++#++:     +#+    ##+#    +#+   +#+
  +#+        +#+          +#+      #+    +#+   +#+
 #+#        #+#          #+#      +#    #+#   #+#
#########  ##########   ###########    #########
`));
const pkgJSON = require('../../package.json');
exports.schema = {
    name: 'lego',
    version: pkgJSON.version,
    description: '',
    commands: [
        {
            command: 'create',
            action: (0, path_1.resolve)(__dirname, 'create'),
            description: '初始化项目',
            options: [],
            examples: [
                'lego create'
            ],
        },
        {
            command: 'build',
            description: '项目编译',
            action: (0, path_1.resolve)(__dirname, 'build'),
        },
        {
            command: 'publish',
            action: (0, path_1.resolve)(__dirname, 'publish'),
            description: 'publish component',
            options: [],
        },
    ]
};
//# sourceMappingURL=index.js.map