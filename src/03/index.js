const { readFile } = require('../utils')
const { countTreesOnPath } = require('./slope-trajectory')

const map = readFile(__dirname).split('\n').map(line => line.split(''))
console.log(`Part I: ${countTreesOnPath(map, 3, 1)} trees on the path`)

const totalTreesOnAllPaths = [
  countTreesOnPath(map, 1, 1),
  countTreesOnPath(map, 3, 1),
  countTreesOnPath(map, 5, 1),
  countTreesOnPath(map, 7, 1),
  countTreesOnPath(map, 1, 2)
].reduce((acc, cur) => acc * cur)
console.log(`Part II: Count of trees multiplied = ${totalTreesOnAllPaths}`)
