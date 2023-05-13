"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prog_1 = __importDefault(require("./prog"));
require("./build");
require("./create");
require("./publish");
prog_1.default.parse(process.argv);
//# sourceMappingURL=index.js.map