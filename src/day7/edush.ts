import fs from 'fs'

const lines = fs
  .readFileSync('/Users/jorgemartin/repo/adventOfCode22/src/day7/test.txt', 'utf8')
  .trim()
  .split('\n')

class File {
  constructor(readonly name: string, readonly size: number) {}
}

class Folder {
  readonly parent: Folder
  constructor(readonly name: string, parent?: Folder) {
    this.parent = parent || this
  }

  files: File[] = []
  folders: Folder[] = []
  #size: number = -1

  addFile(name: string, size: number) {
    this.files.push(new File(name, size))
  }
  addFolder(name: string) {
    this.folders.push(new Folder(name, this))
  }
  getFolder(name: string) {
    const folder = this.folders.find((x) => x.name == name)
    if (!folder) throw new Error(`Folder ${name} not found in ${this.name}`)
    return folder
  }
  get size() {
    if (this.#size === -1)
      this.#size = this.files.concat(this.folders).reduce((acc, node) => acc + node.size, 0)
    return this.#size
  }
}

const root = new Folder('/')
let cwd = root

for (const line of lines) {
  if (line.startsWith('$')) {
    const [, command, arg] = line.split(' ')
    if (command == 'cd') {
      if (arg == '/') cwd = root
      else if (arg == '..') cwd = cwd.parent
      else cwd = cwd.getFolder(arg)
    }
  } else if (line.startsWith('dir')) {
    const [, dirName] = line.split(' ')
    cwd.addFolder(dirName)
  } else {
    const [size, name] = line.split(' ')
    cwd.addFile(name, +size)
  }
}

/** Log  */

function printFolder(folder: Folder, level: string) {
  console.log(`${level.slice(2)} DIR ${folder.name} ${folder.size}`)
  folder.files.forEach((file) => {
    console.log(`${level} ${file.size} ${file.name}`)
  })
  folder.folders.forEach((folder) => {
    printFolder(folder, level + ' -')
  })
}

printFolder(root, ' -')

/** Part 1 */

let total = 0
function iterateBig(folder: Folder) {
  folder.folders.forEach((folder) => {
    const size = folder.size
    if (size <= 100000) total += size
    iterateBig(folder)
  })
}
iterateBig(root)
console.log(total)

/** Part 2 */
const minSize = 40000000
const needed = root.size - minSize
let foundMinSize = Number.MAX_SAFE_INTEGER

function iterate(folder: Folder) {
  folder.folders.forEach((folder) => {
    const size = folder.size
    if (size >= needed) foundMinSize = Math.min(size, foundMinSize)
    iterate(folder)
  })
}
iterate(root)

console.log(foundMinSize)
console.log(root.size)
