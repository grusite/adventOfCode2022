import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day8/puzzle.txt', 'utf8')
  .split('\n')

const matrix = lines.map((line) => {
  return line.split('').map(Number)
})

function createArrayFromColumns() {
  const columnRow: number[][] = []

  for (let i = 0; i < matrix.length; i++) {
    const temp: number[] = []
    matrix.forEach((treeRow) => {
      temp.push(treeRow[i])
    })
    columnRow[i] = temp
  }
  return columnRow
}
const columns = createArrayFromColumns()

function treeIsVisibleInARow(treeRow: number[], index: number) {
  const possibleVisible = treeRow[index]
  const leftArr = treeRow.slice(0, index)
  const rightArr = treeRow.slice(index + 1)

  if (!leftArr.some((t) => t >= possibleVisible) || !rightArr.some((t) => t >= possibleVisible))
    return true
}

let visibles: number[] = []
function getVisibles(treeRow: number[], columnIndex: number) {
  treeRow.forEach((tree, i) => {
    if (treeIsVisibleInARow(treeRow, i) || treeIsVisibleInARow(columns[i], columnIndex))
      visibles.push(tree)
  })
}

matrix.forEach((treeRow, i) => {
  getVisibles(treeRow, i)
})

console.log(visibles.length)
