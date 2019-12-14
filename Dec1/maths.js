const { getInput } = require("../readInput");

const fuelRequirementsForModule = mass => Math.floor(mass / 3) - 2;

const fuelRequirementForModuleAndFuel = mass => {
  let fuelMass = fuelRequirementsForModule(mass);
  let totalFuel = fuelMass;
  while (fuelMass > 0) {
    fuelMass = fuelRequirementsForModule(fuelMass);
    if (fuelMass > 0) {
      totalFuel += fuelMass;
    }
    console.log(fuelMass, totalFuel);
  }
  return totalFuel;
};

const totalFuelForModules = fuelFunction => (fuel, mass) =>
  (fuel += fuelFunction(mass));

// part1
const sumFuelRequirementsForModules = inputArr => {
  const fuelReq = inputArr.reduce(
    totalFuelForModules(fuelRequirementsForModule),
    0
  );
  console.info(fuelReq);
};

// part2
const sumTotalFuelRequirements = inputArr => {
  const fuelReq = inputArr.reduce(
    totalFuelForModules(fuelRequirementForModuleAndFuel),
    0
  );
  console.info(fuelReq);
};

getInput("./modules.txt", sumTotalFuelRequirements);
