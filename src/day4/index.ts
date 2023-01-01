import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day4/puzzle.txt', 'utf8')
  .split('\n')

// console.log(lines)
// ---Parse---
type Range = [number, number]
const inputPart1: Range[][] = []
lines.forEach((el) => {
  const tmp: Range[] = []
  el.split(',').forEach((range) =>
    tmp.push(
      range
        .split('-')
        .map((e) => +e)
        .sort((a, b) => a - b) as Range
    )
  )
  tmp.sort((a, b) => {
    const bb = b[1] - b[0]
    const aa = a[1] - a[0]
    return bb - aa
  })
  inputPart1.push(tmp)
})
// ---Parse---
// console.log(inputPart1)

function part1() {
  let totalFullyContains = 0
  inputPart1.forEach((list) => {
    if (list[0][0] <= list[1][0] && list[1][1] <= list[0][1]) totalFullyContains++
  })
  console.log('part1', totalFullyContains)
}
part1()

function part2() {
  let overlaps = 0
  inputPart1.forEach((list) => {
    if (list[1][1] >= list[0][0] && list[1][0] <= list[0][1]) overlaps++
  })
  console.log('part2', overlaps)
}
part2()
