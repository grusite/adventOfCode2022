import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day7/puzzle.txt', 'utf8')
  .split('\n')

const mappedFileSystem: Record<string, number> = {}
const currentDir: string[] = []

function checkCommand(cmd: string) {
  const splittedCmd = cmd.split(' ')

  if (splittedCmd[0] === '$') {
    if (splittedCmd[1] === 'cd') {
      if (splittedCmd[2] !== '..') currentDir.push(splittedCmd[2])
      else {
        const sum = mappedFileSystem[currentDir.join('.')]
        currentDir.pop()
        mappedFileSystem[currentDir.join('.')] += sum
      }
    } else if (splittedCmd[1] === 'ls') {
      mappedFileSystem[currentDir.join('.')] = 0
    }
  } else if (splittedCmd[0] === 'dir') {
    return
  } else {
    mappedFileSystem[currentDir.join('.')] += +splittedCmd[0]
  }
}

lines.forEach((cmd, i) => {
  checkCommand(cmd)
})
for (let i = 0; i < currentDir.length + 1; i++) checkCommand('$ cd ..')

// Part 1
console.log(mappedFileSystem)
let totalSum = 0
const dirs = Object.entries(mappedFileSystem)
for (const [_dir, size] of dirs) {
  if (size < 100000) {
    totalSum += size
  }
}
console.log(totalSum)

// Part 2
const unusedSpace = 70000000 - mappedFileSystem['/']
unusedSpace
const neededSpace = 30000000 - unusedSpace
neededSpace
if (neededSpace > 0) {
  const directoryToBeRemoved = []
  for (const [dir, size] of dirs) {
    if (size > neededSpace) directoryToBeRemoved.push(size)
  }
  directoryToBeRemoved.sort((a, b) => a - b)
  directoryToBeRemoved[0]
}
