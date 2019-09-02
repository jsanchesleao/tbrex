

const Switcher = require('./switcher');
const Output = require('./output');

const inquirer = require('inquirer');

class Selector extends Switcher{

  constructor({prompt, options}) {
    super(prompt, options);
  }

  async run(args) {
    try {
      const {action} = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: this.desc,
        choices: this.listChoices()
      }]);
      await action.exec(
        {_:args}, 
        new Output(console.log.bind(console)));
    }
    catch(err) {
      console.error(err);
      return 1;
    }
  }

  listChoices() {
    return this.getCommandNames().map(name => ({
      name: `${name}`,
      value: this.config[name]
    }));
  }

}

module.exports = Selector