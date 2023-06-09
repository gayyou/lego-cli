import {resolve} from "path";
import {CliSchema} from "../cli-core";

import chalk from 'chalk';

console.log(chalk.yellowBright(`
      :::        :::::::::    :::::::::      :::::::::
     :+:        :+:          :+:            :+:   :+:
    +:+        +:+          +:+            +:+   +:+
   +#+        +#++#++:     +#+    ##+#    +#+   +#+
  +#+        +#+          +#+      #+    +#+   +#+
 #+#        #+#          #+#      +#    #+#   #+#
#########  ##########   ###########    #########
`))

const pkgJSON = require('../../package.json');

export const schema: CliSchema = {
  name: 'lego',
  version: pkgJSON.version,
  description: '',
  commands: [
    {
      command: 'create',
      action: resolve(__dirname, 'create'),
      description: '初始化项目',
      options: [],
      examples: [
        'lego create'
      ],
    },
    {
      command: 'build',
      description: '项目编译',
      action: resolve(__dirname, 'build'),
    },
    {
      command: 'publish',
      action: resolve(__dirname, 'publish'),
      description: 'publish component',
      options: [],
    },
  ]
}
