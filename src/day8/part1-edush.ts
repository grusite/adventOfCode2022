import fs from 'fs'

const lines = fs.readFileSync('./puzzle.txt', 'utf8').trim().split('\n')

const grid = lines.map((line) => line.split('').map(Number))

const rows = grid.length
const cols = grid[0].length

let count = 0

const fromWest = (x: number, y: number, n: number) => {
  for (let i = 0; i < x; i++) if (grid[y][i] >= n) return false
  return true
}
const fromEast = (x: number, y: number, n: number) => {
  for (let i = x + 1; i < cols; i++) if (grid[y][i] >= n) return false
  return true
}
const fromNorth = (x: number, y: number, n: number) => {
  for (let i = 0; i < y; i++) if (grid[i][x] >= n) return false
  return true
}
const fromSouth = (x: number, y: number, n: number) => {
  for (let i = y + 1; i < rows; i++) if (grid[i][x] >= n) return false
  return true
}
function isVisible(x: number, y: number, n: number) {
  return fromWest(x, y, n) || fromEast(x, y, n) || fromNorth(x, y, n) || fromSouth(x, y, n)
}

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const visible = isVisible(x, y, grid[y][x])
    // console.log(x, y, '--', grid[y][x], visible)
    if (visible) count++
  }
}

console.log(count)
