import { list } from "postcss"
import input from "./input.js"

let safeReports = 0

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

export const areLevelsMonotonic = (listItem) => {
  let increasing = true
  let decreasing = true

  for (let i = 0; i < listItem.length - 1; i++) {
    if (listItem[i] > listItem[i + 1]) {
      increasing = false
    }
    if (listItem[i] < listItem[i + 1]) {
      decreasing = false
    }
  }
  return increasing || decreasing
}

export const areAdjacentLevelsValid = (listItem) => {
  for (let i = 0; i < listItem.length - 1; i++) {
    const difference = Math.abs(listItem[i + 1] - listItem[i])
    if (difference < 1 || difference > 3) {
      return false
    }
  }
  return true
}

const howManySafeReports = (input) => {
  let safeReports = 0

  input.forEach(listItem => {
    if (areLevelsMonotonic(listItem) && areAdjacentLevelsValid(listItem)) {
      safeReports ++
    }
  });

  return safeReports
}

console.log(howManySafeReports(input))
