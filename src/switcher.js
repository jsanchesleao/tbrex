const minimist = require('minimist');
const Output = require('./output');

class Switcher {

  constructor(desc, config) {
    if (!config) { config = desc; desc = "" };

    this.config = config;
    this.desc = desc;
  }

  showAvailableActions() {
    console.log(this.desc || "Available commands: ");
    console.log('');
    this.getCommandNames().forEach(command => {
      console.log(`${command}: ${this.config[command].describe()}`);
    });
    console.log('');
  }

  getCommandNames() {
    const names = [];
    for(let i in this.config) {
      if (this.config.hasOwnProperty(i)) {
        names.push(i);
      }
    }
    return names.sort();
  }

  async run(args) {
    try {
      const action = args[0];
      if (!action || !this.config[action]) {
        this.showAvailableActions();
        return 1;
      }
      else {
        return this.config[action].exec(
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