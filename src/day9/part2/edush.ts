import fs from 'fs'

// const lines = fs.readFileSync('./test2.txt', 'utf8').trim().split('\n')
// const lines = fs.readFileSync('./test2.txt', 'utf8').trim().split('\n')
const lines = fs.readFileSync('./puzzle.txt', 'utf8').trim().split('\n')

const grid: number[][] = []

type Coord = [x: number, y: number]

const MOVES: Record<string, Coord> = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
}

type Pos = Coord[]
const trace: Pos[] = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
]

function applyMove(pos: Pos, move: Coord): Pos {
  const nPos = JSON.parse(JSON.stringify(pos))
  nPos[0] = [pos[0][0] + move[0], pos[0][1] + move[1]]
  // console.log('nPos[0]', nPos[0])
  for (let i = 1; i < nPos.length; i++) {
    const prev = nPos[i - 1]
    const curr = nPos[i]
    const diffX = prev[0] - curr[0]
    const diffY = prev[1] - curr[1]
    if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
      nPos[i][0] += diffX > 1 ? 1 : diffX < -1 ? -1 : diffX
      nPos[i][1] += diffY > 1 ? 1 : diffY < -1 ? -1 : diffY
    }
    // console.log(diffX, '-', diffY)
  }
  return nPos
}

const tailVisited = new Set<string>()
// print(trace[0])

async function main() {
  for (const line of lines) {
    const m = line.match(/(\w) (\d+)/)
    if (!m) throw new Error('bad')
    const dir = m[1]
    const move = MOVES[dir]
    const num = +m[2]

    // console.log('\n\n--------------', dir, num)

    for (let i = 0; i < num; i++) {
      const pos = trace[trace.length - 1]
      const nextPos = applyMove(pos, move)
      trace.push(nextPos)
      // await print(nextPos)
      tailVisited.add(`${nextPos.at(-1)![0]}:${nextPos.at(-1)![1]}`)
    }
  }
}
main()

console.log(tailVisited.size)

async function print(pos: Pos) {
  console.clear()
  // console.log(`\n\n${pos.join('  ')}\n`)

  for (let y = 20; y >= -10; y--) {
    for (let x = -20; x < 20; x++) {
      if (x == pos[0][0] && y == pos[0][1]) process.stdout.write('H')
      else {
        let found = false
        for (let i = 1; i < pos.length; i++) {
          if (x == pos[i][0] && y == pos[i][1]) {
            process.stdout.write(i + '')
            found = true
            break
          }
        }
        if (!found) process.stdout.write('·')
      }
    }
    process.stdout.write('\n')
  }
  await new Promise((resolve) => setTimeout(resolve, 50))
}

// function printVisited() {
//   for (let y = 300; y >= -40; y--) {
//     for (let x = -100; x < 200; x++) {
//       if (x == 0 && y == 0) process.stdout.write('s')
//       if (tailVisited.has(`${x}:${y}`)) process.stdout.write('#')
//       else process.stdout.write('·')
//     }
//     process.stdout.write('\n')
//   }
// }

// console.log(trace)
// printVisited()
