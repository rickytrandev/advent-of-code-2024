import input from "./input.js"

const findTotalDistance = (input) => {
  let list1 = []
  let list2 = []
  let total = 0

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [num1, num2] = line.trim().split(/\s+/).map(Number)
      list1.push(num1)
      list2.push(num2)
    })

  list1.sort((a, b) => a - b)
  list2.sort((a, b) => a - b)

  for (let i = 0; i < list1.length; i++) {
    const min = Math.min(list1[i], list2[i])
    const max = Math.max(list1[i], list2[i])

    total += max - min
  }

  return total
}

console.log(findTotalDistance(input))
