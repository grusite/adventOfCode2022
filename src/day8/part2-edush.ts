import fs from 'fs'

const lines = fs.readFileSync('./puzzle.txt', 'utf8').trim().split('\n')

const grid = lines.map((line) => line.split('').map(Number))

const rows = grid.length
const cols = grid[0].length

let count = 0

const toWest = (x: number, y: number, n: number) => {
  let v = 0
  for (let i = x - 1; i >= 0; i--) {
    v++
    if (grid[y][i] >= n) break
  }
  return v
}
const toEast = (x: number, y: number, n: number) => {
  let v = 0
  for (let i = x + 1; i < cols; i++) {
    v++
    if (grid[y][i] >= n) break
  }
  return v
}
const toNorth = (x: number, y: number, n: number) => {
  let v = 0
  for (let i = y - 1; i >= 0; i--) {
    v++
    if (grid[i][x] >= n) break
  }
  return v
}
const toSouth = (x: number, y: number, n: number) => {
  let v = 0
  for (let i = y + 1; i < rows; i++) {
    v++
    // console.log(x,y,n,`${i}:${x}`,grid[i][x],grid[i][x] >= n)
    if (grid[i][x] >= n) break
  }
  // console.log('---',`${x}:${y}`,n,v)
  return v
}
function getScore(x: number, y: number, n: number) {
  // return toWest(x, y, n)
  // return toNorth(x, y, n) +'-'+ toEast(x, y, n) +'-'+ toSouth(x, y, n) +'-'+ toWest(x, y, n)
  return toNorth(x, y, n) * toEast(x, y, n) * toSouth(x, y, n) * toWest(x, y, n)
}

const gridScore = JSON.parse(JSON.stringify(grid))

let bigger = 0
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    bigger = Math.max(bigger, getScore(x, y, grid[y][x]))
    // gridScore[y][x] = getScore(x, y, grid[y][x])
    // console.log(x, y, '--', grid[y][x], visible)
  }
}

// console.log(gridScore)
console.log(bigger)
