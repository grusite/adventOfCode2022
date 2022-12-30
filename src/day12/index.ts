import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day12/puzzle.txt', 'utf8')
  .split('\n')

// console.log(lines)

type Coords = [row: number, pos: number]
interface Connections {
  D?: Node | undefined
  R?: Node | undefined
  L?: Node | undefined
  T?: Node | undefined
}

class Node {
  weight: number
  connections: Node[] = []
  visited = false

  constructor(public name: string, public position: Coords) {
    if (name === 'S') this.weight = 'a'.charCodeAt(0) - 97
    else if (name === 'E') this.weight = 'z'.charCodeAt(0) - 97
    else this.weight = name.charCodeAt(0) - 97
  }
}

class Grid {
  nodes: Node[] = []
  path: Coords[] = [[0, 0]]
  deleted: Coords[] = []
  visited: Coords[] = []
  timesFound = 0

  constructor() {
    this.create()
    this.addConnections()
  }

  create() {
    lines.forEach((line, row) => {
      line.split('').map((name, pos) => {
        this.nodes.push(new Node(name, [row, pos]))
      })
    })
  }

  addConnections() {
    const tmp: Node[] = []

    this.nodes.forEach((node) => {
      const row = node.position[0]
      const pos = node.position[1]

      const connections: Connections = {
        D: lines[row + 1]?.[pos]
          ? this.nodes.find((n) => n.position[0] === row + 1 && n.position[1] === pos)
          : undefined,
        R: lines[row][pos + 1]
          ? this.nodes.find((n) => n.position[0] === row && n.position[1] === pos + 1)
          : undefined,
        L: lines[row][pos - 1]
          ? this.nodes.find((n) => n.position[0] === row && n.position[1] === pos - 1)
          : undefined,
        T: lines[row - 1]?.[pos]
          ? this.nodes.find((n) => n.position[0] === row - 1 && n.position[1] === pos)
          : undefined,
      }

      Object.values(connections).forEach((value) => {
        if (value != undefined && node.weight - value.weight! >= -1) {
          node.connections.push(value)
        }
      })
    })
  }

  suffleConns() {
    this.nodes.forEach((node) => {
      for (let i = node.connections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = node.connections[i]
        node.connections[i] = node.connections[j]
        node.connections[j] = temp
      }
    })
  }

  // shuffleConnections(array: any) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     const temp = array[i]
  //     array[i] = array[j]
  //     array[j] = temp
  //   }
  //   return [...array]
  // }

  // shiftConnections(array: any) {
  //   const tmp = [...array]
  //   tmp.unshift(tmp.pop())
  //   return tmp
  // }

  stepsToE() {
    let actualNode = this.nodes.find((node) => node.name === 'S')!
    let end = this.nodes.find((node) => node.name === 'E')!
    if (!actualNode || !end) return 'Ops, bad input file'

    actualNode.visited = true
    while (actualNode.name !== 'E') {
      let found = false
      // const sanitizedConnections = this.shuffleConnections(actualNode.connections)
      const noVisited = actualNode.connections.find((node) => !node.visited)
      if (noVisited) {
        if (noVisited.name === 'E') {
          noVisited.visited = true
          actualNode = noVisited
          this.path.push(noVisited.position)
          const steps = this.path.length - 1
          console.log(steps)
          // print(this.path, [0, 0], [2, 5])
          this.path = [[0, 0]]
          this.timesFound++
          return steps
        }

        found = true
        noVisited.visited = true
        actualNode = noVisited
        this.path.push(noVisited.position)
      } else {
        for (const node of actualNode.connections) {
          // FINISH!
          if (node.name === 'E') {
            node.visited = true
            actualNode = node
            this.path.push(node.position)
            const steps = this.path.length - 1
            console.log(steps)
            // print(this.path, [0, 0], [2, 5])
            this.path = [[0, 0]]
            this.timesFound++
            return steps
          }

          // MOVE TOWARDS FINISH
          if (
            !this.path.find(
              (coord) => coord[0] === node.position[0] && coord[1] === node.position[1]
            ) &&
            !this.deleted.find(
              (coord) => coord[0] === node.position[0] && coord[1] === node.position[1]
            )
          ) {
            found = true
            node.visited = true
            actualNode = node
            this.path.push(node.position)
            break
          }
        }
      }

      if (!found) {
        const pop = this.path.pop()!
        this.deleted.push(pop)
        actualNode = this.nodes.find(
          (node) =>
            node.position[0] === this.path.at(-1)![0] && node.position[1] === this.path.at(-1)![1]
        )!
      }
    }
  }

  async dijkstra() {
    const totalSteps: number[] = []
    while (this.nodes.some((node) => !node.visited)) {
      await delay(500)
      const steps = this.stepsToE() as number
      if (totalSteps?.includes(steps)) this.suffleConns()
      totalSteps.push(steps)
      console.log('NO VISIT', this.nodes.filter((node) => !node.visited).length)
    }
    return totalSteps
      .filter((e) => e! < 1000)
      .sort()
      .slice(0, 3)
  }
}

async function main() {
  const grid = new Grid()

  const tmp = await grid.dijkstra()
  console.log(tmp)
}
main()

/*
----
----
----
----
*/
// PRINT MOVEMENTS
function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
function exists(position: Coords[], pos: number[]) {
  let location = NaN
  position.forEach((p, i) => {
    if (p[0] === pos[0] && p[1] === pos[1]) location = i
  })
  return location
}
function direction(posA: number[], posB: number[]) {
  if (!posA || !posB) return 'NA'
  if (posA[0] === posB[0] && posA[1] < posB[1]) return 'R'
  if (posA[0] === posB[0] && posA[1] > posB[1]) return 'L'
  if (posA[0] < posB[0] && posA[1] === posB[1]) return 'D'
  if (posA[0] > posB[0] && posA[1] === posB[1]) return 'T'
}
function print(position: Coords[], start: number[], end: number[]) {
  lines.map((line, row) => {
    line.split('').map((_, i) => {
      if (row === start[0] && i === start[1]) {
        // if (row === 0 && i === 0) {
        // if (row === 20 && i === 0) {
        process.stdout.write(line[i])
        return
      }
      if (row === end[0] && i === end[1]) {
        // if (row === 2 && i === 5) {
        // if (row === 20 && i === 120) {
        process.stdout.write(line[i])
        return
      }
      const pos = exists(position, [row, i])
      if (pos >= 0) {
        if (direction(position[pos], position[pos + 1]) === 'R') process.stdout.write('˃')
        if (direction(position[pos], position[pos + 1]) === 'L') process.stdout.write('ᑉ')
        if (direction(position[pos], position[pos + 1]) === 'T') process.stdout.write('˄')
        if (direction(position[pos], position[pos + 1]) === 'D') process.stdout.write('˅')
      } else process.stdout.write('.')
    })
    process.stdout.write('\n')
  })
}
// lines.map((line) => {
//   line.split('').map((l, i) => {
//     process.stdout.write(l)
//   })
//   process.stdout.write('\n')
// })
process.stdout.write('\n')
// print([0, 0], [2, 5])
// print([20, 0], [20, 120])
