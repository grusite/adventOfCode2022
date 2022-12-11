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
type RopeCoords = [
  H: Cords,
  P2: Cords,
  P3: Cords,
  P4: Cords,
  P5: Cords,
  P6: Cords,
  P7: Cords,
  P8: Cords,
  P9: Cords,
  T: Cords
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

function moveTailIfLongEnough(tail: Cords, head: Cords, knot: number) {
  if (head[0] === tail[0] && head[1] - tail[1] > 1) {
    const futureTail: Cords = [tail[0], tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (head[0] === tail[0] && head[1] - tail[1] < -1) {
    const futureTail: Cords = [tail[0], tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (head[0] - tail[0] > 1 && head[1] === tail[1]) {
    const futureTail: Cords = [tail[0] + 1, tail[1]]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (head[0] - tail[0] < -1 && head[1] === tail[1]) {
    const futureTail: Cords = [tail[0] - 1, tail[1]]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (
    (head[0] - tail[0] > 1 && head[1] - tail[1] === 1) ||
    (head[0] - tail[0] === 1 && head[1] - tail[1] > 1)
  ) {
    const futureTail: Cords = [tail[0] + 1, tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (
    (head[0] - tail[0] > 1 && head[1] - tail[1] === -1) ||
    (head[0] - tail[0] === 1 && head[1] - tail[1] < -1)
  ) {
    const futureTail: Cords = [tail[0] + 1, tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (
    (head[0] - tail[0] < -1 && head[1] - tail[1] === 1) ||
    (head[0] - tail[0] === -1 && head[1] - tail[1] > 1)
  ) {
    const futureTail: Cords = [tail[0] - 1, tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  if (
    (head[0] - tail[0] < -1 && head[1] - tail[1] === -1) ||
    (head[0] - tail[0] === -1 && head[1] - tail[1] < -1)
  ) {
    const futureTail: Cords = [tail[0] - 1, tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  return tail
}

const calcs: Record<Directions, Cords> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

function moveHead(ropeLastCoord: RopeCoords, qnt: number, direction: Directions) {
  for (let i = 0; i < qnt; i++) {
    ropeLastCoord[0] = [
      ropeLastCoord[0][0] + calcs[direction][0],
      ropeLastCoord[0][1] + calcs[direction][1],
    ]
    let tmp = [ropeLastCoord[0]]
    for (let i = 1; i < 9; i++) {
      ropeLastCoord[i] = moveTailIfLongEnough(ropeLastCoord[i + 1], ropeLastCoord[i], i)
      tmp.push(ropeLastCoord[i])
    }
    rope.push(tmp as RopeCoords)
    tmp = []
  }
}

directions.forEach((dirs, i) => {
  moveHead(rope.at(-1)!, +dirs[1], dirs[0] as Directions)
})

console.log(directions)
console.log(rope)
console.log(tailMoves)
console.log(tailMoves.length)
