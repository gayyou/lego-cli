import { MiddlewareOption } from "../types";
import parseCommandMiddleware from "./parseCommand";

const buildInMiddlewaresBeforeCustom: MiddlewareOption[] = [];
const buildInMiddlewaresAfterCustom: MiddlewareOption[] = [
  {
    name: 'cli-core:parseCommand',
    middleware: parseCommandMiddleware
  }
];

export {
  buildInMiddlewaresBeforeCustom,
  buildInMiddlewaresAfterCustom,
}
