import fs from 'fs'

const lines = fs.readFileSync('/Users/jorgemartin/test.dat', 'utf8').split('\n')

lines

const input = lines[0]

function checkDifferent(input: string, len: number) {
  for (let i = 0; i < input.length; i++) {
    const check = new Set(input.slice(i, i + len))
    if (check.size === len) return i + len
  }
}

console.log(checkDifferent(input, 4))
console.log(checkDifferent(input, 14))
