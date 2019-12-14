const { getInput } = require("../readInput");
const { opcodes } = require("./opcodes");

const runInstruction = (opcode, args) => {
  return opcodes[opcode].op(args);
};

function* runInstructions(input) {
  const output = [...input];

  let instructionPointer = 0;
  while (instructionPointer < input.length) {
    const opcode = output[instructionPointer];

    if (opcode === 99) {
      break;
    }

    const param1 = output[output[instructionPointer + 1]];
    const param2 = output[output[instructionPointer + 2]];

    const outputLocation = output[instructionPointer + 3];

    yield (output[outputLocation] = runInstruction(opcode, [param1, param2]));

    instructionPointer += opcodes[opcode].instructionLength;
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

const bruteForce = (output, input) => {
  const programInput = [...input];
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      programInput[1] = noun;
      programInput[2] = verb;
      const attempt = runProgram(programInput);

      if (attempt === output) {
        return { noun, verb };
      }
    }
  }

  return { noun: -1, verb: -1 }; // got fuckt
};

const dec2p2 = output => inputArr => {
  const programInput = inputArr.map(s => parseInt(s, 10));

  const { noun, verb } = bruteForce(output, programInput);

  console.log(noun, verb, 100 * noun + verb);
};

getInput("./program.txt", dec2p1, ",");
getInput("./program.txt", dec2p2(19690720), ",");
