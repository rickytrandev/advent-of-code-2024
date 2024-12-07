import { it, expect, describe } from "vitest"
import { areAdjacentLevelsValid, areLevelsMonotonic } from "../howManySafeReports"

describe.skip("areLevelsMonotonic function", () => {
  it("should return true if numbers are increasing or decreasing", () => {
    const listItem1 = [9, 10, 12, 13, 13]
    const listItem2 = [90, 87, 85, 72, 70]

    const result1 = areLevelsMonotonic(listItem1)
    const result2 = areLevelsMonotonic(listItem2)

    expect(result1).toBe(true)
    expect(result2).toBe(true)
  })

  it("should return false if numbers are not increasing or decreasing", () => {
    const listItem1 = [92, 91, 92, 93, 99]
    const listItem2 = [14, 12, 15, 13, 16]

    const result1 = areLevelsMonotonic(listItem1)
    const result2 = areLevelsMonotonic(listItem2)

    expect(result1).toBe(false)
    expect(result2).toBe(false)
  })
})

describe("areAdjacentLevelsValid function", () => {
  it("should return true if any two adjacent values are within 1-3", () => {
    const listItem1 = [9, 10, 12, 13, 13]
    const listItem2 = [90, 87, 85, 82, 80]
    const listItem3 = [1, 3, 6, 8, 11]

    expect(areAdjacentLevelsValid(listItem1)).toBe(false)
    expect(areAdjacentLevelsValid(listItem2)).toBe(true)
    expect(areAdjacentLevelsValid(listItem3)).toBe(true)
  })
})
