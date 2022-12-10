import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day10/puzzle.txt', 'utf8')
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

let xRegister: number = 1
let totalCycles = 0
const signalStrengths: number[] = []
const getCyclesRatio = () => {
  const cicTmp: number[] = []
  for (let i = 20; i < 221; i += 40) cicTmp.push(i)
  return cicTmp
}
const cyclesDurationStrenght = getCyclesRatio()

function waitCycle(signal: Cycles, value?: number) {
  for (let i = 1; i <= cycles[signal]; i++) {
    totalCycles++
    if (cyclesDurationStrenght.includes(totalCycles)) {
      signalStrengths.push(xRegister * totalCycles)
    }
    if (signal === Cycles.Addx && i === cycles[signal]) xRegister += value!
  }
}

cpuSignal.forEach((signal) => {
  waitCycle(signal[0] as Cycles, +signal[1])
})

console.log(xRegister)
console.log(totalCycles)
console.log(signalStrengths)
let total = 0
signalStrengths.map((val) => (total += val))
console.log(total)
