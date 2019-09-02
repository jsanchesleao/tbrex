const minimist = require('minimist');
const Output = require('./output');

class Switcher {

  constructor({prompt = 'Available commands: ', options}) {
    this.prompt = prompt;
    this.options = options;
  }

  showAvailableActions() {
    console.log(this.prompt);
    console.log('');
    this.getCommandNames().forEach(command => {
      console.log(`${command}: ${this.options[command].describe()}`);
    });
    console.log('');
  }

  getCommandNames() {
    const names = [];
    for(let i in this.options) {
      if (this.options.hasOwnProperty(i)) {
        names.push(i);
      }
    }
    return names.sort();
  }

  async run(args) {
    try {
      const action = args[0];
      if (!action || !this.options[action]) {
        this.showAvailableActions();
        return 1;
      }
      else {
        return this.options[action].exec(
          minimist(args.slice(1)),
          new Output(console.log.bind(console))
        );
      }
    }
    catch(err) {
      console.error(err);
      return 1;
    }
  }
}

module.exports = Switcher;