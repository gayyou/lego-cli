"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sade_1 = __importDefault(require("sade"));
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
const pkgJson = require('../../package.json');
const program = (0, sade_1.default)('lego');
program.version(pkgJson.version);
exports.default = program;
//# sourceMappingURL=prog.js.map