# TBrex - CLI Maker

This is a library intended to help creating CLI tools.

## Installation

`npm install tbrex --save`

## Example Usage

```javascript
  class EchoCommand extends Command {
    constructor() {
      super("echo");
    }

    async exec(args, out) {
      out.send(args);
      return this.SUCCESS;
    }

    describe() {
      return 'Echoes back any arguments passed to it';
    }
  }

  const app = new Switcher({
    echo: new EchoCommand()
  })

  app.run(process.argv.slice(2)).then(process.exit);
```
