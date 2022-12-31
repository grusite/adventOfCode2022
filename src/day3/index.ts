import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day3/test.txt', 'utf8')
  .split('\n')

// console.log(lines)
// ---Parse---
const inputPart1: string[][][] = []
lines.forEach((el) => {
  const arrEl = [...el]
  const ruckSack: string[][] = []
  const firstComp = arrEl.splice(0, el.length / 2)
  ruckSack.push(firstComp)
  ruckSack.push(arrEl)
  inputPart1.push(ruckSack)
})

const inputPart2: string[][][] = []
for (let i = 0; i < lines.length; i += 3) {
  let group = [[...lines[i]], [...lines[i + 1]], [...lines[i + 2]]]
  inputPart2.push(group)
  group = []
}
// ---Parse---
// console.log(inputPart2)

function toPriority(str: string) {
  return str === str.toUpperCase() ? str.charCodeAt(0) - 38 : str.charCodeAt(0) - 96
}

function part1() {
  const sharedItems: string[] = []
  inputPart1.forEach((item) => {
    const foundItem = item[0].find((type) => item[1].includes(type))
    if (!foundItem) return `No item found repeated in ${item}`
    sharedItems.push(foundItem)
    return
  })

  console.log(
    'part1',
    sharedItems.reduce((acc, el) => acc + toPriority(el), 0)
  )
}
part1()

function part2() {
  const sharedItems: string[] = []
  inputPart2.forEach((item) => {
    const foundItem = item[0].find((type) => item[1].includes(type) && item[2].includes(type))
    if (!foundItem) return `No item found repeated in ${item}`
    sharedItems.push(foundItem)
    return
  })
  console.log(
    'part2',
    sharedItems.reduce((acc, el) => acc + toPriority(el), 0)
  )
}
part2()
