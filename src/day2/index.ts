import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day2/puzzle.txt', 'utf8')
  .split('\n')

// console.log(lines)
// ---Parse---
const input: string[][] = []
lines.forEach((el) => {
  input.push(el.split(' '))
})
// ---Parse---
// console.log(input)

enum Shapes {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}
type Opponent = 'A' | 'B' | 'C'
type Me = 'X' | 'Y' | 'Z'
type Outcome = 'Lose' | 'Draw' | 'Win'

const shapeScore: Record<Shapes, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
}

const outcomeScore: Record<Outcome, number> = {
  Lose: 0,
  Draw: 3,
  Win: 6,
}

const win: Record<Shapes, Shapes> = {
  Rock: Shapes.Scissors,
  Paper: Shapes.Rock,
  Scissors: Shapes.Paper,
}

function calcScore(opp: Shapes, me: Shapes) {
  if (win[opp] === me) return outcomeScore.Lose + shapeScore[me]
  if (opp === me) return outcomeScore.Draw + shapeScore[me]
  return outcomeScore.Win + shapeScore[me]
}

const opponent: Record<Opponent, Shapes> = {
  A: Shapes.Rock,
  B: Shapes.Paper,
  C: Shapes.Scissors,
}
function part1() {
  const me: Record<Me, Shapes> = {
    X: Shapes.Rock,
    Y: Shapes.Paper,
    Z: Shapes.Scissors,
  }

  let totalScore = 0
  input.forEach((round) => {
    totalScore += calcScore(opponent[round[0] as Opponent], me[round[1] as Me])
  })
  console.log('part1', totalScore)
}
part1()

function part2() {
  const prediction: Record<Me, Outcome> = {
    X: 'Lose',
    Y: 'Draw',
    Z: 'Win',
  }

  let totalScore = 0
  input.forEach((round) => {
    const opp = round[0] as Opponent
    const pred = round[1] as Me
    const oppShape = opponent[opp]
    const outcome = prediction[pred]

    const getShape: Record<Outcome, Shapes> = {
      Win: Object.keys(win).find((shape) => win[shape as Shapes] === oppShape) as Shapes,
      Draw: oppShape,
      Lose: win[oppShape],
    }

    totalScore += calcScore(oppShape, getShape[outcome])
  })
  console.log('part2', totalScore)
}
part2()
