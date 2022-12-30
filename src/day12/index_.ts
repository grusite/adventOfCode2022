import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day12/test.txt', 'utf8')
  .split('\n')

// console.log(lines)

let position: [row: number, line: number][] = [[0, 0]]
// let position: [row: number, line: number][] = [[20, 0]]
let currentPosition = lines[position[0][0]][position[0][1]]
console.log(currentPosition)

let popTmp: [row: number, line: number][] = []
const exists = (pos: number[]) => {
  let location = NaN
  position.forEach((p, i) => {
    if (p[0] === pos[0] && p[1] === pos[1]) location = i
  })
  return location
}
const existInPopTmp = (pos: number[]) => {
  return popTmp.some((p) => {
    return p[0] === pos[0] && p[1] === pos[1]
  })
}
let i = 500000
let pops = 0
while (i > 0) {
  i--
  if (currentPosition === 'S') currentPosition = 'a'
  // console.log(currentPosition)

  if (
    (currentPosition === 'y' || currentPosition === 'z') &&
    (lines?.[position.at(-1)![0]]?.[position.at(-1)![1] + 1]?.charCodeAt(0) === 69 ||
      lines?.[position.at(-1)![0] + 1]?.[position.at(-1)![1]]?.charCodeAt(0) === 69 ||
      lines?.[position.at(-1)![0]]?.[position.at(-1)![1] - 1]?.charCodeAt(0) === 69 ||
      lines?.[position.at(-1)![0] - 1]?.[position.at(-1)![1]]?.charCodeAt(0) === 69)
  ) {
    // console.log(currentPosition)
    // position.push([20, 120])
    position.push([2, 5])
    console.log('EUREKA!')
    break
  }

  // Right
  if (
    currentPosition.charCodeAt(0) -
      lines?.[position.at(-1)![0]]?.[position.at(-1)![1] + 1]?.charCodeAt(0) >=
      -1 &&
    !exists([position.at(-1)![0], position.at(-1)![1] + 1]) &&
    !existInPopTmp([position.at(-1)![0], position.at(-1)![1] + 1]) &&
    lines?.[position.at(-1)![0]]?.[position.at(-1)![1] + 1] !== 'E'
  ) {
    currentPosition = lines[position.at(-1)![0]][position.at(-1)![1] + 1]
    position.push([position.at(-1)![0], position.at(-1)![1] + 1])

    // Up
  } else if (
    currentPosition.charCodeAt(0) -
      lines?.[position.at(-1)![0] + 1]?.[position.at(-1)![1]]?.charCodeAt(0) >=
      -1 &&
    !exists([position.at(-1)![0] + 1, position.at(-1)![1]]) &&
    !existInPopTmp([position.at(-1)![0] + 1, position.at(-1)![1]]) &&
    lines?.[position.at(-1)![0] + 1]?.[position.at(-1)![1]] !== 'E'
  ) {
    currentPosition = lines[position.at(-1)![0] + 1][position.at(-1)![1]]
    position.push([position.at(-1)![0] + 1, position.at(-1)![1]])

    // Left
  } else if (
    currentPosition.charCodeAt(0) -
      lines?.[position.at(-1)![0]]?.[position.at(-1)![1] - 1]?.charCodeAt(0) >=
      -1 &&
    !exists([position.at(-1)![0], position.at(-1)![1] - 1]) &&
    !existInPopTmp([position.at(-1)![0], position.at(-1)![1] - 1]) &&
    lines?.[position.at(-1)![0]]?.[position.at(-1)![1] - 1] !== 'E'
  ) {
    currentPosition = lines[position.at(-1)![0]][position.at(-1)![1] - 1]
    position.push([position.at(-1)![0], position.at(-1)![1] - 1])

    // Down
  } else if (
    currentPosition.charCodeAt(0) -
      lines?.[position.at(-1)![0] - 1]?.[position.at(-1)![1]]?.charCodeAt(0) >=
      -1 &&
    !exists([position.at(-1)![0] - 1, position.at(-1)![1]]) &&
    !existInPopTmp([position.at(-1)![0] - 1, position.at(-1)![1]]) &&
    lines?.[position.at(-1)![0] - 1]?.[position.at(-1)![1]] !== 'E'
  ) {
    currentPosition = lines[position.at(-1)![0] - 1][position.at(-1)![1]]
    position.push([position.at(-1)![0] - 1, position.at(-1)![1]])
  } else {
    pops++
    const prevPos = position.pop()
    popTmp.push(prevPos!)
    currentPosition = lines[position.at(-1)![0]][position.at(-1)![1]]
  }
}

console.log(position)
console.log(position.length - 1)
// console.log(pops)

function print() {
  lines.map((line, row) => {
    line.split('').map((_, i) => {
      if (row === 0 && i === 0) {
        // if (row === 20 && i === 0) {
        process.stdout.write(line[i])
        return
      }
      if (row === 2 && i === 5) {
        // if (row === 20 && i === 120) {
        process.stdout.write(line[i])
        return
      }
      const pos = exists([row, i])
      if (pos >= 0) {
        if (direction(position[pos], position[pos + 1]) === 'R') process.stdout.write('˃')
        if (direction(position[pos], position[pos + 1]) === 'L') process.stdout.write('ᑉ')
        if (direction(position[pos], position[pos + 1]) === 'U') process.stdout.write('˄')
        if (direction(position[pos], position[pos + 1]) === 'D') process.stdout.write('˅')
      } else process.stdout.write('.')
    })
    process.stdout.write('\n')
  })
}
print()

function direction(posA: number[], posB: number[]) {
  if (!posA || !posB) return 'NA'
  if (posA[0] === posB[0] && posA[1] < posB[1]) return 'R'
  if (posA[0] === posB[0] && posA[1] > posB[1]) return 'L'
  if (posA[0] < posB[0] && posA[1] === posB[1]) return 'D'
  if (posA[0] > posB[0] && posA[1] === posB[1]) return 'U'
}
