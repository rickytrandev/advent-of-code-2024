import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let input = readFileSync(resolve(__dirname, "input.txt"), "utf-8");
input = input.split("\n").map(line => {
  const [firstPart, secondPart] = line.split(":")
  const numbersArray = secondPart.trim().split(' ').map(Number)

  return[Number(firstPart), numbersArray]
})

console.log(input)

// Evaluate all possible combinations of operators (+ and *) for the given numbers in each line.
// Check if any combination produces the test value.
// If it does, include the test value in the sum of all valid equations.

const object = {
  testValue: 0,
  numbers: []
}