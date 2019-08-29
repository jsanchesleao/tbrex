class Output {
  constructor(writer) {
    this.writer = writer;
  }

  send(...args) {
    this.writer.apply(null, args);
  }
}

module.exports = Output;