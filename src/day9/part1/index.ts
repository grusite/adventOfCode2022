import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day9/part1/test.txt', 'utf8')
  .split('\n')

const directions = lines.map((dirs) => dirs.split(' '))

enum Directions {
  Up = 'U',
  Down = 'D',
  Right = 'R',
  Left = 'L',
}
type Cords = [x: number, y: number]
type RopeCoords = [T: Cords, H: Cords]

const rope: RopeCoords[] = [
  [
    [0, 0],
    [0, 0],
  ],
]
let tailMoves: Cords[] = [[0, 0]]

function moveTailIfLongEnough(tail: Cords, head: Cords, prevHead: Cords) {
  const x = Math.abs(head[0] - tail[0])
  const y = Math.abs(head[1] - tail[1])

  if (x > 1 || y > 1) {
    if (!tailMoves.find((tail) => tail[0] === prevHead[0] && tail[1] === prevHead[1]))
      tailMoves.push(prevHead)
    return prevHead
  }
  return tail
}

const calcs: Record<Directions, Cords> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

function moveHead(tail: Cords, head: Cords, qnt: number, direction: Directions) {
  let futTail = [...tail] as Cords
  for (let i = 0; i < qnt; i++) {
    const prevHead = [...head] as Cords
    head = [head[0] + calcs[direction][0], head[1] + calcs[direction][1]]
    futTail = moveTailIfLongEnough(tail, head, prevHead)
    rope.push([futTail, head])
  }
}

directions.forEach((dirs) => {
  moveHead(rope.at(-1)![0], rope.at(-1)![1], +dirs[1], dirs[0] as Directions)
})

console.log(directions)
console.log(rope)
console.log(tailMoves)
console.log(tailMoves.length)
