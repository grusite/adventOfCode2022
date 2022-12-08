import fs from 'fs'

const lines = fs.readFileSync('/Users/jorgemartin/puzzle.txt', 'utf8').split('\n')

const cargos = [] as string[][]

function move(src: number, dst: number, qnt: number) {
  cargos[dst].unshift(...cargos[src].splice(0, qnt))
}

for (const line of lines) {
  if (line.startsWith('move')) {
    const [, qnt, src, dst] = line.match(/move (\d+) from (\d+) to (\d+)/) || []
    move(+src - 1, +dst - 1, +qnt)
    continue
  }
  if (!line.length) {
    for (let i = 0; i < cargos.length; i++) if (!cargos[i]) cargos[i] = []
  }
  if (!line.includes('[')) continue

  for (let i = 0; i < line.length; i += 4) {
    const item = line[i + 1]
    const cargoIndex = i / 4

    if (item !== ' ') {
      if (!cargos[cargoIndex]) cargos[cargoIndex] = []
      cargos[cargoIndex].push(item)
    }
  }
}

console.log(cargos.map((x) => x[0]).join(''))
cargos
