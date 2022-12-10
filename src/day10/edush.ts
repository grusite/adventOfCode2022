import fs from 'fs'
import { EventEmitter } from 'stream'

// const lines = fs.readFileSync('./test.txt', 'utf8').trim().split('\n')
const lines = fs.readFileSync('./puzzle.txt', 'utf8').trim().split('\n')

type OpType = 'addx' | 'noop'
type Op = [op: OpType, v: number]
type Program = Op[]

class CPU extends EventEmitter {
  rX = 1
  cycle = 0
  tick() {
    this.cycle++
    this.emit('cycle')
  }
  addx(v: number) {
    this.tick()
    this.tick()
    this.rX += v
  }
  noop() {
    this.tick()
  }
}

class ROM {
  memory: Op[] = []
  load(program: Program) {
    this.memory = program
  }
  read() {
    return this.memory.shift()
  }
}

class CRT {
  draw(cycle: number, rX: number) {
    const pixel = (cycle - 1) % 40

    const match = rX - pixel + 1
    if (match >= 0 && match < 3) {
      process.stdout.write(`#`)
    } else {
      process.stdout.write('.')
    }

    if (pixel == 39) process.stdout.write('\n')
  }
}

class PC {
  readonly cpu = new CPU()
  readonly rom = new ROM()
  readonly crt = new CRT()

  constructor() {
    this.cpu.on('cycle', () => {
      this.crt.draw(this.cpu.cycle, this.cpu.rX)
    })
  }

  boot(program: Program) {
    this.rom.load(program)

    let op: Op | undefined
    while ((op = this.rom.read())) {
      this.cpu[op[0]](op[1])
    }
  }
}

// Parse input
const disk: Program = lines.map((line) => {
  const [op, v] = line.split(' ')
  return [op as OpType, Number(v)]
})
const pc = new PC()

// Part 1
let count = 0
pc.cpu.on('cycle', () => {
  if (20 + (pc.cpu.cycle % 40) == 40) {
    count += pc.cpu.cycle * pc.cpu.rX
  }
})

pc.boot(disk)

console.log('\n' + count)
