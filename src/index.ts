import { schema } from "./actions";
import {App} from './cli-core/index'

const app = new App({
  schema,
  plugins: [],
  cli: "lego"
});

app.execute();
