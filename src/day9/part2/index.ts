import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day9/part2/puzzle.txt', 'utf8')
  .split('\n')

const directions = lines.map((dirs) => dirs.split(' '))

enum Directions {
  Up = 'U',
  Down = 'D',
  Right = 'R',
  Left = 'L',
}
type Coords = [x: number, y: number]
type RopeCoords = [
  H: Coords,
  P2: Coords,
  P3: Coords,
  P4: Coords,
  P5: Coords,
  P6: Coords,
  P7: Coords,
  P8: Coords,
  P9: Coords,
  T: Coords
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
let tailMoves: Coords[] = [[0, 0]]

function moveTailIfLongEnough(tail: Coords, head: Coords, knot: number) {
  // When moves up only
  if (head[0] === tail[0] && head[1] - tail[1] > 1) {
    const futureTail: Coords = [tail[0], tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves down only
  if (head[0] === tail[0] && head[1] - tail[1] < -1) {
    const futureTail: Coords = [tail[0], tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves right only
  if (head[0] - tail[0] > 1 && head[1] === tail[1]) {
    const futureTail: Coords = [tail[0] + 1, tail[1]]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves left only
  if (head[0] - tail[0] < -1 && head[1] === tail[1]) {
    const futureTail: Coords = [tail[0] - 1, tail[1]]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves in diagonal top right
  if (
    (head[0] - tail[0] > 1 && head[1] - tail[1] === 1) ||
    (head[0] - tail[0] === 1 && head[1] - tail[1] > 1) ||
    (head[0] - tail[0] > 1 && head[1] - tail[1] > 1)
  ) {
    const futureTail: Coords = [tail[0] + 1, tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves in diagonal down right
  if (
    (head[0] - tail[0] > 1 && head[1] - tail[1] === -1) ||
    (head[0] - tail[0] === 1 && head[1] - tail[1] < -1) ||
    (head[0] - tail[0] > 1 && head[1] - tail[1] < -1)
  ) {
    const futureTail: Coords = [tail[0] + 1, tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves in diagonal top left
  if (
    (head[0] - tail[0] < -1 && head[1] - tail[1] === 1) ||
    (head[0] - tail[0] === -1 && head[1] - tail[1] > 1) ||
    (head[0] - tail[0] < -1 && head[1] - tail[1] > 1)
  ) {
    const futureTail: Coords = [tail[0] - 1, tail[1] + 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  // When moves in diagonal down left
  if (
    (head[0] - tail[0] < -1 && head[1] - tail[1] === -1) ||
    (head[0] - tail[0] === -1 && head[1] - tail[1] < -1) ||
    (head[0] - tail[0] < -1 && head[1] - tail[1] < -1)
  ) {
    const futureTail: Coords = [tail[0] - 1, tail[1] - 1]
    if (
      knot === 9 &&
      !tailMoves.find((tail) => tail[0] === futureTail[0] && tail[1] === futureTail[1])
    )
      tailMoves.push(futureTail)
    return futureTail
  }
  return tail
}

const calcs: Record<Directions, Coords> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

function moveHead(ropeLastCoord: RopeCoords, qnt: number, direction: Directions) {
  let tmpRopeLastCoord = [...ropeLastCoord]
  for (let i = 0; i < qnt; i++) {
    let tmp = []
    tmpRopeLastCoord[0] = [
      tmpRopeLastCoord[0][0] + calcs[direction][0],
      tmpRopeLastCoord[0][1] + calcs[direction][1],
    ]
    tmp.push(tmpRopeLastCoord[0])
    for (let i = 1; i < 10; i++) {
      tmpRopeLastCoord[i] = moveTailIfLongEnough(tmpRopeLastCoord[i], tmpRopeLastCoord[i - 1], i)
      tmp.push(tmpRopeLastCoord[i])
    }
    rope.push(tmp as RopeCoords)
    tmp = []
  }
}

directions.forEach((dirs, i) => {
  moveHead(rope[rope.length - 1], +dirs[1], dirs[0] as Directions)
})

// console.log(directions)
// console.log(rope)
// console.log(tailMoves)
console.log(tailMoves.length)
