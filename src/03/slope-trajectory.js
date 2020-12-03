const isTree = (map, x, y) => map[y][x] === '#'

const countTreesOnPath = (map, deltaX, deltaY) => {
  const height = map.length
  const width = map[0].length

  let x, y, trees
  x = y = trees = 0

  while (y < height) {
    if (isTree(map, x, y)) {
      trees++
    }

    x += deltaX
    y += deltaY

    x %= width
  }

  return trees
}

module.exports = {
  countTreesOnPath
}
