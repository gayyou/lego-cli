import { EventEmitter } from 'events';
import {BuildInEvent, CliSchema, Context, MiddlewareOption, Plugin} from "./types";
import { parse } from 'path';
import { buildInMiddlewaresAfterCustom, buildInMiddlewaresBeforeCustom } from "./middlewares";

interface AppProps {
  cli: string;
  plugins: Plugin[];
  schema: CliSchema;
}

enum AppStatus {
  NOT_START = 'not_start',
  RUNNING = 'running',
  END = 'end',
}

export default class App extends EventEmitter {
  private status: AppStatus;
  private readonly context: Context;

  constructor(props: AppProps = {} as AppProps) {
    super();
    const { cli, plugins, schema } = props;
    this.context = {
      argv: process.argv,
      cli: cli || parse(process.argv[1]).name,
      commands: [parse(process.argv[1]).name, ...process.argv.slice(2)],
      customData: {},
      error: null,
      middlewares: [],
      // 通过监听事件做操作
      plugins: plugins?.slice() || [],
      // 注册schema
      schema,
      on: this.on.bind(this),
      emit: this.emit.bind(this),
    };
    this.status = AppStatus.NOT_START;
  }

  initPlugins = () => {
    const { plugins } = this.context;

    plugins.forEach((plugin) => {
      const { init } = plugin;

      init.call(plugin, this.context);
    });
  }

  use = (middlewareOption: MiddlewareOption) => {
    if (this.status !== AppStatus.NOT_START) {
      return ;
    }
    this.context.middlewares.unshift(middlewareOption);
  }

  registryPlugin = (plugin: Plugin) => {
    if (this.status !== AppStatus.NOT_START) {
      return ;
    }
    this.context.plugins.push(plugin)
  }

  execute = () => {
    if (this.status !== AppStatus.NOT_START) {
      return ;
    }
    try {
      this.initPlugins();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    this.emit(BuildInEvent.START, { context: this.context });

    // apply middlewares
    const appliedMiddlewares: MiddlewareOption[] = [];

    const applyMiddleware = (middlewareOption: MiddlewareOption) => {
      const { name } = middlewareOption;
      if (appliedMiddlewares.find((item) => item.name === middlewareOption.name)) {
        throw new Error(`middleware ${name} has been registered`);
      }
      appliedMiddlewares.unshift(middlewareOption);
      this.emit(BuildInEvent.APPLY_MIDDLEWARE, { context: this.context, middlewareOption });
    }

    // add buildIn middleware before custom middlewares
    buildInMiddlewaresBeforeCustom.forEach(applyMiddleware);
    this.context.middlewares.forEach(applyMiddleware);
    // add buildIn middleware after custom middlewares
    buildInMiddlewaresAfterCustom.forEach(applyMiddleware);

    this.emit(BuildInEvent.BEFORE_EXECUTE, { context: this.context });
    this.status = AppStatus.RUNNING;

    let next = () => Promise.resolve();
    const handler = async () => {
      appliedMiddlewares.forEach((middlewareOption) => {
        const { name, middleware } = middlewareOption;
        const bindErrorMiddleware = () => {
          if (this.context.error && !this.context.error.middlewareName) {
            this.context.error.middlewareName = name;
          }
        }
        const _next = next;
        const protectedInvokeNext = async () => {
          if (protectedInvokeNext.called) {
            throw new Error('next() called multiple times');
          }

          bindErrorMiddleware();
          await _next();
          protectedInvokeNext.called = true;
        }
        protectedInvokeNext.called = false;

        next = async () => {
          try {
            this.emit(BuildInEvent.BEFORE_EXECUTE_MIDDLEWARE, { context: this.context, middlewareOption });
            await middleware(this.context, protectedInvokeNext);
          } catch (e: any) {
            this.context.error = {
              error: e,
              middlewareName: name,
            };
            this.emit(BuildInEvent.EXECUTE_MIDDLEWARE_THROW_ERROR, { context: this.context, middlewareOption, error: this.context.error });
          } finally {
            bindErrorMiddleware();
            this.emit(BuildInEvent.AFTER_EXECUTE_MIDDLEWARE, { context: this.context, middlewareOption });
          }
        }
      });

      try {
        await next();
        this.emit(BuildInEvent.AFTER_EXECUTE, { context: this.context });
      } catch (e: any) {
        this.context.error = {
          error: e,
        };
      } finally {
        this.emit(BuildInEvent.END, { context: this.context });
      }
    }

    handler();
  }
}
