import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day11/test.txt', 'utf8')
  .split('\n')

const monkeisInLines: string[][] = []
let tmp: string[] = []
for (let i = 0; i <= lines.length; i++) {
  if ((i !== 0 && i % 7 === 0) || i === lines.length) {
    monkeisInLines.push(tmp)
    tmp = []
  }
  tmp.push(lines[i])
}

function parseMonkey(monkeyText: string[]) {
  const id = monkeyText[0].match(/\d+/g)!.map(Number)
  const items = monkeyText[1].match(/\d+/g)!.map(Number)
  const operation = monkeyText[2].split('old ')[1].split(' ')
  const test = monkeyText[3].match(/\d+/g)!.map(Number)
  const trueThrow = monkeyText[4].match(/\d+/g)!.map(Number)
  const falseThrow = monkeyText[5].match(/\d+/g)!.map(Number)

  return new Monkey(id[0], items, operation[0], operation[1], test[0], [
    trueThrow[0],
    falseThrow[0],
  ])
}

class Monkey {
  constructor(
    readonly id: number,
    public itemsWorryLevel: number[],
    readonly operator: string,
    readonly operationNumber: string,
    readonly testBy: number,
    readonly monkeyToThrow: [true: number, false: number]
  ) {}

  public totalInspectedItems = 0

  addItem(item: number) {
    this.itemsWorryLevel.push(item)
  }

  emptyItems() {
    this.itemsWorryLevel = []
  }

  operation(item: number) {
    const rightOperator = this.operationNumber === 'old' ? item : +this.operationNumber
    if (this.operator === '+') return item + rightOperator
    if (this.operator === '-') return item - rightOperator
    if (this.operator === '*') return item * rightOperator
    if (this.operator === '/') return item / rightOperator
    return item
  }

  updateWorryLevel() {
    this.itemsWorryLevel.forEach((itemLevel, i) => {
      this.itemsWorryLevel[i] = this.operation(itemLevel)
    })
  }

  test(item: number) {
    return item % this.testBy === 0 ? this.monkeyToThrow[0] : this.monkeyToThrow[1]
  }

  throw(monkey: Monkey, item: number) {
    monkey.addItem(item)
  }
}

function main() {
  const monkeys = monkeisInLines.map((monkey) => {
    return parseMonkey(monkey)
  })

  console.log('pre', monkeys)

  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      monkey.updateWorryLevel()
      monkey.itemsWorryLevel.map((item, i) => {
        monkey.totalInspectedItems++
        const monkeyToTrow = monkeys.filter(({ id }) => id === monkey.test(item))[0]
        monkey.throw(monkeyToTrow, item)
      })
      monkey.emptyItems()
    })
  }

  // console.log('pos', monkeys)

  // Part 2
  monkeys.forEach((monkey) => {
    console.log('== After round 1 ==')
    console.log(`Monkey ${monkey.id} inspected items ${monkey.totalInspectedItems} times`)
  })
  monkeys.sort((a, b) => b.totalInspectedItems - a.totalInspectedItems)
  console.log('Total Numer', monkeys[0].totalInspectedItems * monkeys[1].totalInspectedItems)
}

main()
