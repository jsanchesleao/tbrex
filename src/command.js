class Command {

  constructor(name) {
    this.name = name;
    this.SUCCESS = 0;
    this.FAIL = 1;
  }

  async exec() {
    throw new Error('Unimplemented Command', this);
  }

  describe() {
    return '';
  }

}

module.exports = Command;