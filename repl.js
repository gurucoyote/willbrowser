const Vorpal = require('vorpal');
const repl = require('vorpal-repl');

const vorpal = Vorpal();

vorpal
  .delimiter('node~$')
  .use(repl)
  .show();
