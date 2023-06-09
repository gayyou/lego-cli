"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const index_1 = require("./cli-core/index");
const app = new index_1.App({
    schema: actions_1.schema,
    plugins: [],
    cli: "lego"
});
app.execute();
//# sourceMappingURL=index.js.map