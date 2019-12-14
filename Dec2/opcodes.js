const add = ([a, b]) => a + b;
const multiply = ([a, b]) => a * b;
const halt = () => eval("console.log('HALT!, you shouldn't get here');");

module.exports = {
  opcodes: {
    1: {
      op: add,
      instructionLength: 4
    },
    2: {
      op: multiply,
      instructionLength: 4
    },
    99: {
      op: halt,
      instructionLength: 4
    }
  }
};
