// 增加cli能力
export interface Plugin {
  name: string;
  init(ctx: Context): void;
}

export type MiddlewareNext = () => Promise<any>;

export type Middleware = (context: Context, next: MiddlewareNext) => Promise<any>;

export type MiddlewareOption = {
  name: string;
  middleware: Middleware;
}

export interface Context {
  // 命令行工具名
  cli: string;
  // 参数列表
  argv: string[];
  // 命令内容
  commands: string[];
  // 插件列表
  plugins: Plugin[];
  // 中间件列表
  middlewares: MiddlewareOption[];
  // 错误对象
  error:  { error: Error; [key: string]: any; } | null;
  // 自定义上下文数据
  customData: Record<string, any>;
  // 定义命令的schema
  schema: CliSchema;
  // 事件监听
  on: (eventName: string, ...args: any[]) => void;
  emit: (eventName: string, ...args: any[]) => void;
}

interface CliOption {
  flag: string;
  example?: string;
  defaultValue?: string;
}

export interface CliSchemaCommand {
  command: string;
  description?: string;
  examples?: string[];
  alias?: string[];
  options?: CliOption[];
  // 命令执行文件，根据执行命令懒加载文件
  action: string;
}

export interface CliSchema {
  name: string;
  version: string;
  description: string;
  commands: CliSchemaCommand[];
}

export enum BuildInEvent {
  APPLY_MIDDLEWARE = 'buildIn:applyMiddleware',
  BEFORE_EXECUTE = 'buildIn:beforeExecute',
  AFTER_EXECUTE = 'buildIn:afterExecute',
  BEFORE_EXECUTE_MIDDLEWARE = 'buildIn:before-execute-middleware',
  AFTER_EXECUTE_MIDDLEWARE = 'buildIn:after-execute-middleware',
  START = 'buildIn:start',
  END = 'buildIn:end',
  EXECUTE_MIDDLEWARE_THROW_ERROR = 'buildIn:execute-middleware-throw-error',
}
