const {Command, Switcher} = require('../');

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

class MathCommand extends Command {
  constructor(name, op) {
    super(name);
    this.op = op;
  }

  async exec(args, out) {
    out.send(this.op(args._[0], args._[1]));
    return this.SUCCESS;
  }
}

class CalcCommand extends Command {
  constructor() {
    super("calc");
    this.switcher = new Switcher({
      prompt: 'Available calc operations: ', 
      options: {
        add: new MathCommand('add', (a, b) => a + b),
        mult: new MathCommand('mult', (a, b) => a * b)
      }
    });
  }

  async exec(args, out) {
    return this.switcher.run(args._);
  }
}

const app = new Switcher({
  options: {
    echo: new EchoCommand(),
    calc: new CalcCommand()
  }
});

app.run(process.argv.slice(2)).then(process.exit);