const {Command, Selector} = require('../');

class EchoCommand extends Command {
  constructor() {
    super("echo");
  }

  async exec(args, out) {
    out.send(args._.join(' '));
    return this.SUCCESS;
  }

  describe() {
    return 'Echoes back any arguments passed to it';
  }
}

class UpperCommand extends Command {
  constructor() {
    super("echo");
  }

  async exec(args, out) {
    out.send(args._.join(' ').toUpperCase());
    return this.SUCCESS;
  }

  describe() {
    return 'uppercases the arguments';
  }
}

const app = new Selector({
  prompt: 'Select an action',
  options: {
    echo: new EchoCommand(),
    upper: new UpperCommand()
  }
});

app.run(process.argv.slice(2)).then(process.exit);