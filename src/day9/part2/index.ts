import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day9/puzzle.txt', 'utf8')
  .split('\n')

const directions = lines.map((dirs) => dirs.split(' '))

enum Directions {
  Up = 'U',
  Down = 'D',
  Right = 'R',
  Left = 'L',
}
type Cords = [x: number, y: number]
type RopeCoords = [
  T: Cords,
  P2: Cords,
  P3: Cords,
  P4: Cords,
  P5: Cords,
  P6: Cords,
  P7: Cords,
  P8: Cords,
  P9: Cords,
  H: Cords
]

const rope: RopeCoords[] = [
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
let tailMoves: Cords[] = [[0, 0]]

function moveNextIfLongEnough(prev: Cords, head: Cords, prevHead: Cords) {
  const x = Math.abs(head[0] - prev[0])
  const y = Math.abs(head[1] - prev[1])

  if (x > 1 || y > 1) {
    if (!tailMoves.find((tail) => tail[0] === prevHead[0] && tail[1] === prevHead[1]))
      tailMoves.push(prevHead)
    return prevHead
  }
  return prev
}

function moveHead(prev: Cords, head: Cords, qnt: number, direction: Directions) {
  let futPrev = [...prev] as Cords
  for (let i = 0; i < qnt; i++) {
    const prevHead = [...head] as Cords
    if (direction === Directions.Up) head = [head[0], head[1] + 1]
    if (direction === Directions.Down) head = [head[0], head[1] - 1]
    if (direction === Directions.Left) head = [head[0] - 1, head[1]]
    if (direction === Directions.Right) head = [head[0] + 1, head[1]]
    futPrev = moveNextIfLongEnough(prev, head, prevHead)
    rope.push([futPrev, head])
  }
}

directions.forEach((dirs) => {
  moveHead(rope.at(-1)![0], rope.at(-1)![1], +dirs[1], dirs[0] as Directions)
})

console.log(directions)
console.log(rope)
console.log(tailMoves)
console.log(tailMoves.length)
