import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day10/test.txt', 'utf8')
  .split('\n')
const cpuSignal = lines.map((signal) => signal.split(' '))

enum Cycles {
  Noop = 'noop',
  Addx = 'addx',
}
const cycles: Record<Cycles, number> = {
  noop: 1,
  addx: 2,
}

let xRegister = 1
let totalCycles = 0

const getCiclesRatio = () => {
  const cicTmp: number[] = []
  for (let i = 40; i < 240; i += 40) cicTmp.push(i)
  return cicTmp
}
const ciclesDuration = getCiclesRatio()

function drawCPU() {
  const ciclesInLine = totalCycles % 40
  if (ciclesInLine >= xRegister && ciclesInLine <= xRegister + 2) {
    process.stdout.write('#')
  } else {
    process.stdout.write('.')
  }

  if (ciclesDuration.includes(totalCycles)) {
    process.stdout.write('\n')
  }
}

function waitCycle(signal: Cycles, value?: number) {
  for (let i = 1; i <= cycles[signal]; i++) {
    totalCycles++
    drawCPU()
    if (signal === Cycles.Addx && i === cycles[signal]) {
      xRegister += value!
    }
  }
}

cpuSignal.forEach((signal) => {
  waitCycle(signal[0] as Cycles, +signal[1])
})
