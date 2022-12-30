import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day1/puzzle.txt', 'utf8')
  .split('\n')

// console.log(lines)

const input: number[][] = []
let byElf: number[] = []
lines.forEach((e, i) => {
  if (i === lines.length - 1) byElf.push(+e)
  if (e === '' || i === lines.length - 1) {
    input.push(byElf)
    byElf = []
    return
  }
  byElf.push(+e)
})
// console.log(input)

function part1() {
  const total = input.map((calories) => {
    return calories.reduce((acc, el) => acc + el, 0)
  })
  console.log('part1', total.sort((a, b) => b - a)[0])
}
part1()

function part2() {
  const total = input.map((calories) => {
    return calories.reduce((acc, el) => acc + el, 0)
  })
  console.log(
    'part2',
    total
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, el) => acc + el, 0)
  )
}
part2()
