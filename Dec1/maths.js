const { getInput } = require("../readInput");

const fuelRequirementsForModule = mass => Math.floor(mass / 3) - 2;

const fuelRequirementForModuleAndFuel = mass => {
  let fuel = fuelRequirementsForModule(mass);
  let totalFuel = fuel;
  while (fuel > 0) {
    fuel = fuelRequirementsForModule(fuel);
    if (fuel > 0) {
      totalFuel += fuel;
    }
    console.log(fuel, totalFuel);
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
