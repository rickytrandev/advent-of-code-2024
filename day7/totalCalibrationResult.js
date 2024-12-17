import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let input = readFileSync(resolve(__dirname, "input.txt"), "utf-8")
input = input.split("\n").map((line) => {
  const [firstPart, secondPart] = line.split(":")
  const numbersArray = secondPart.trim().split(" ").map(Number)

  return [Number(firstPart), numbersArray]
})

// Evaluate all possible combinations of operators (+ and *) for the given numbers in each line.
// Check if any combination produces the test value.
// If it does, include the test value in the sum of all valid equations.

function generateOperatorCombinations(length, operators = ["+", "*"]) {
  // Example usage:
  // console.log(generateOperatorCombinations(input[1][1].length));
  // Output: [["+", "+"], ["+", "*"], ["*", "+"], ["*", "*"]]
  if (length === 0) return [[]] // Base case: no slots left, return an empty combination.

  const smallerCombinations = generateOperatorCombinations(
    length - 1,
    operators
  )
  const combinations = []

  for (const combination of smallerCombinations) {
    for (const operator of operators) {
      combinations.push([...combination, operator]) // Add each operator to smaller combinations.
    }
  }

  return combinations
}

const totalCalibrationResult = (input) => {
  // for each input create a list of operands
  // for each numbers in the input, loop through operands to add or multiply to get a total.
  // if the total is equal to the testValue, add to the total.
  // return the total once the whole input list has been ran through.
  let total = 0

  input.forEach((element) => {
    const [testValue, numbers] = element
    const operands = generateOperatorCombinations(numbers.length - 1)
    
    for (const operand of operands) {
      const result = numbers.slice(1).reduce((acc, num, i) => {
        const operator = operand[i]
        if (operator === "+") {
          return acc + num
        } else if (operator === "*") {
          return acc * num
        }
        throw new Error(`Unknown operator: ${operator}`)
      }, numbers[0])

      if (result === testValue) {
        total += testValue
        break
      }
    }
  })
  return total
}

console.log(totalCalibrationResult(input))
