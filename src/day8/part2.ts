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

function checkNumberOfVisibility(slicedTreeRow: number[], treeToCheck: number) {
  let total = 0
  for (const tree of slicedTreeRow) {
    total++
    if (treeToCheck <= tree) break
  }
  return total
}

function treeIsVisibleInARow(treeRow: number[], index: number) {
  const possibleVisible = treeRow[index]
  const leftArr = treeRow.slice(0, index).reverse()
  const rightArr = treeRow.slice(index + 1)

  return (
    checkNumberOfVisibility(leftArr, possibleVisible) *
    checkNumberOfVisibility(rightArr, possibleVisible)
  )
}

let visibles: number = 0
function getVisibles(treeRow: number[], columnIndex: number) {
  treeRow.forEach((tree, i) => {
    const total = treeIsVisibleInARow(treeRow, i) * treeIsVisibleInARow(columns[i], columnIndex)
    if (total > visibles) visibles = total
  })
}

matrix.forEach((treeRow, i) => {
  getVisibles(treeRow, i)
})

console.log(visibles)
