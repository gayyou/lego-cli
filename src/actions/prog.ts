import sade from "sade";
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

const pkgJson = require('../../package.json');

const program = sade('lego');

program.version(pkgJson.version);

export default program;
