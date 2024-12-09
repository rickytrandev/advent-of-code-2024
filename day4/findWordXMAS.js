import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import { count } from "console"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let input = readFileSync(resolve(__dirname, "input.txt"), "utf-8")
const grid = input.split("\n").map((line) => line.split(""))
const word = 'XMAS'

const directions = {
  RIGHT: { dx: 1, dy: 0 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  UP: { dx: 0, dy: -1 },
  DOWN_RIGHT: { dx: 1, dy: 1 },
  UP_LEFT: { dx: -1, dy: -1 },
  DOWN_LEFT: { dx: -1, dy: 1 },
  UP_RIGHT: { dx: 1, dy: -1 },
}

const searchWord = (grid, word, x, y, direction) => {
  const { dx, dy } = direction;
  for (let i = 0; i < word.length; i++) {
    const newX = x + i * dx;
    const newY = y + i * dy;
    if (
      newX < 0 || newX >= grid[0].length ||
      newY < 0 || newY >= grid.length ||
      grid[newY][newX] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};

const countOccurrences = (grid, word) => {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      for (const direction of Object.values(directions)) {
        if (searchWord(grid, word, x, y, direction)) {
          count++;
        }
      }
    }
  }
  return count;
};

// const grid = [
//   ['M', 'M', 'M', 'M', 'M'],
//   ['M', 'X', 'M', 'M', 'M'],
//   ['A', 'M', 'X', 'M', 'M'],
//   ['S', 'A', 'M', 'X', 'M'],
//   ['M', 'S', 'A', 'M', 'X'],
// ]

console.log(countOccurrences(grid, word))