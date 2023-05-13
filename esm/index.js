"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sade_1 = __importDefault(require("sade"));
const prog = (0, sade_1.default)('lego');
prog.command('create <name>')
    .describe('Create a component project')
    .option('-t, --type', 'JavaScript or TypeScript', 'typescript')
    .example('build src build --global --config my-conf.js')
    .example('build app public -o main.js')
    .action((name, opts) => {
    console.log(`> create component name ${name}`);
    console.log('> these are extra opts', opts);
});
prog.parse(process.argv);
//# sourceMappingURL=index.js.map