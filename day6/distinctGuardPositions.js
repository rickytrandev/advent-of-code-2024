import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let input = readFileSync(resolve(__dirname, "input.txt"), "utf-8");
const grid = input.split("\n").map((line) => line.split(""));

const findStartPosition = (grid) => {
  const guardSymbols = ["^", ">", "v", "<"];

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const x = row.findIndex((cell) => guardSymbols.includes(cell));

    if (x !== -1) {
      // Guard found
      return { x, y, direction: row[x] }; // Return the position and facing direction
    }
  }

  throw new Error("Guard's starting position not found!");
};

const simulateGuard = (grid, startX, startY, startDirection) => {
  const directions = {
    "^": { dx: 0, dy: -1 }, // Up
    ">": { dx: 1, dy: 0 }, // Right
    "v": { dx: 0, dy: 1 }, // Down
    "<": { dx: -1, dy: 0 }, // Left
  };

  const turnRight = {
    "^": ">", // Up -> Right
    ">": "v", // Right -> Down
    "v": "<", // Down -> Left
    "<": "^", // Left -> Up
  };

  let y = startY;
  let x = startX;
  let direction = startDirection;
  const visited = new Set([`${x},${y}`]);

  while (true) {
    // Calculate next position
    let { dx, dy } = directions[direction];
    let nextX = x + dx;
    let nextY = y + dy;

    // Check if within bounds
    if (
      nextX < 0 ||
      nextX >= grid[0].length ||
      nextY < 0 ||
      nextY >= grid.length ||
      grid[nextY][nextX] === "#"
    ) {
      // Turn right if out of bounds or hit an obstacle
      direction = turnRight[direction];
      continue;
    }

    // Move to the next position
    x = nextX;
    y = nextY;

    // Add the new position to the visited set
    visited.add(`${x},${y}`);

    // Debug: Print the current position and direction
    console.log(`Moved to (${x}, ${y}) facing ${direction}`);

    // Check if the guard has returned to the starting position
    if (x === startX && y === startY) {
      break;
    }
  }

  return visited.size;
};

const startPosition = findStartPosition(grid);
const distinctPositions = simulateGuard(
  grid,
  startPosition.x,
  startPosition.y,
  startPosition.direction
);

console.log(`The guard will visit ${distinctPositions} distinct positions.`);
