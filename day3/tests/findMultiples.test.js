import { it, expect, describe, beforeEach } from "vitest"
import {
  findMatches,
  findMultiples,
  findSumofMultiples,
} from "../findMultiples"

let input

beforeEach(() => {
  input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))mul(123,4567)`
})

describe("findMultiples funciton", () => {
  it("should parse string and find string sequence matching mul(x,y) and return an array", () => {
    const result = findMatches(input)

    expect(result).toEqual(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"])
  })
  it("should return a list of paired numbers", () => {
    const matches = findMatches(input)
    const multiples = findMultiples(matches)

    expect(multiples).toEqual([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ])
  })
  it("should return the sum of all multiples", () => {
    const result = findSumofMultiples(input)

    expect(result).toEqual(161)
  })
})
