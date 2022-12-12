import fs from 'fs'

// const lines = fs.readFileSync('./puzzle.txt', 'utf8').trim().split('\n')
const lines = fs.readFileSync('./test.txt', 'utf8').trim().split('\n')

class Monkey {
  id: number
  items: number[]
  operation: (n: number) => number
  test: number
  successTo: number
  failTo: number
  inspected: number = 0

  constructor(lines) {
    // Id
    this.id = Number(lines[0].replace('Monkey ', '').replace(':', ''))

    // Items
    this.items = lines[1].replace('  Starting items: ', '').split(', ').map(Number)

    // Operation
    const operationTransform = lines[2].replace('  Operation: new =', '')
    this.operation = new Function('old', 'return ' + operationTransform) as (n: number) => number

    // Test
    this.test = lines[3].replace('  Test: divisible by ', '')

    // Sucess
    this.successTo = Number(lines[4].replace('    If true: throw to monkey ', ''))

    // Fail
    this.failTo = Number(lines[5].replace('    If false: throw to monkey ', ''))
  }

  addItem(item: number) {
    this.items.push(item)
  }

  turn(): [throwTo: number, newItem: number] | undefined {
    if (!this.items.length) return
    this.inspected++
    const item = this.items.shift()!
    const newItem = Math.floor(this.operation(item) / 3)
    const pass = newItem % this.test == 0
    const throwTo = pass ? this.successTo : this.failTo
    return [throwTo, newItem]
  }
}

class Director {
  monkeys: Monkey[] = []
  rounds = 20

  addMonkey(monkey: Monkey) {
    this.monkeys.push(monkey)
  }

  round() {
    for (const monkey of this.monkeys) {
      let result: ReturnType<Monkey['turn']>
      while ((result = monkey.turn())) {
        this.monkeys[result[0]].addItem(result[1])
      }
    }

    // Next round
    this.rounds--
    if (this.rounds) this.round()
  }

  print() {
    for (const monkey of this.monkeys) {
      console.log(`Monkey ${monkey.id} (${monkey.inspected}): ${String(monkey.items)}`)
    }
  }

  getBiz() {
    const mostActive = this.monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2)

    return mostActive[0].inspected * mostActive[1].inspected
  }
}

const director = new Director()
for (let i = 0; i < lines.length; i += 7) {
  const monkey = new Monkey(lines.slice(i, i + 6))
  director.addMonkey(monkey)
}

director.round()
director.print()

console.log(director.getBiz())
