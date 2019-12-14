const { getInput } = require("../readInput");
const { opcodes } = require("./opcodes");

const runInstruction = (opcode, args) => {
  return opcodes[opcode].op(args);
};

const instruction = (pointer, input) => {
  const opcode = input[pointer];
  const operation = opcodes[opcode];

  const outputPointer = pointer + operation.instructionLength - 1;
  const outputLocation = input[outputPointer];

  return {
    opcode,
    outputLocation,
    args: input.slice(pointer + 1, outputPointer)
  };
};

function* runInstructions(input) {
  const output = [...input];

  let pointer = 0;
  while (pointer < output.length) {
    const { opcode, args, outputLocation } = instruction(pointer, output);

    console.log(opcode, args, outputLocation);

    if (opcode === 99) {
      break;
    }

    yield (output[outputLocation] = runInstruction(opcode, args));

    pointer += opcodes[opcode].instructionLength;
  }

  return output;
}

const runProgram = input => {
  const program = runInstructions(input);

  let next = program.next();
  while (!next.done) {
    next = program.next();
  }

  return next.value[0];
};

const dec2p1 = inputArr => {
  const programInput = inputArr.map(s => parseInt(s, 10));

  programInput[1] = 12;
  programInput[2] = 2;

  console.log(runProgram(programInput));
};

getInput("./program.txt", dec2p1, ",");
