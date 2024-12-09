import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8');

export const findMatches = (input) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.match(regex);

  return matches;
}

export const findMultiples = (matches) => {
 const filteredNumbers = matches.map(match => match.match(/(\d+)/g).map(Number))

 return filteredNumbers
}

export const findSumofMultiples = (input) => {
  const matches = findMatches(input)
  const multiples = findMultiples(matches)

  const result = multiples.reduce((acc, multiple) => {
    const product = multiple[0] * multiple[1]

    acc += product
    return acc
  },0)

  return result
};

console.log(findSumofMultiples(input))