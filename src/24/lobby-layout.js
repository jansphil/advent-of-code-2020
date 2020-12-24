const { range, times } = require('lodash')

const DIRECTION_OFFSET = {
  e: [1, 0],
  w: [-1, 0],
  ne: [1, -1],
  nw: [0, -1],
  sw: [-1, 1],
  se: [0, 1]
}

const getTileCoords = (line) => {
  const coords = [0, 0]
  let directions = line

  while (directions !== '') {
    for (const i of range(1, 3)) {
      const direction = DIRECTION_OFFSET[directions.substring(0, i)]
      if (direction) {
        coords[0] += direction[0]
        coords[1] += direction[1]
        directions = directions.substring(i)
        break
      }
    }
  }

  return coords
}

const part1 = (input) => {
  const tiles = {}

  input
    .map(getTileCoords)
    .forEach(([row, col]) => {
      const key = `${row}-${col}`
      tiles[key] = tiles[key] ? tiles[key] + 1 : 1
    })

  return Object.values(tiles)
    .filter((flips) => flips % 2 === 1)
    .length
}

const part2 = (input) => {
  let blackTiles = new Set()
  let minX, minY, maxX, maxY
  minX = minY = maxX = maxY = 0

  input
    .map(getTileCoords)
    .forEach(([x, y]) => {
      const key = `${x}|${y}`
      if (blackTiles.has(key)) {
        blackTiles.delete(key)
      } else {
        blackTiles.add(key)

        if (x > maxX) maxX = x
        else if (x < minX) minX = x

        if (y > maxY) maxY = y
        else if (y < minY) minY = y
      }
    })

  times(100, (i) => {
    const newBlackTiles = new Set()

    range(minX - 1, maxX + 2).forEach((x) => {
      range(minY - 1, maxY + 2).forEach((y) => {
        const blackNeighbours = Object.values(DIRECTION_OFFSET)
          .map(([deltaX, deltaY]) => `${x + deltaX}|${y + deltaY}`)
          .filter((tileKey) => blackTiles.has(tileKey))
          .length

        const key = `${x}|${y}`
        if (blackTiles.has(key)) {
          if (blackNeighbours > 0 && blackNeighbours <= 2) {
            newBlackTiles.add(key)
          }
        } else {
          if (blackNeighbours === 2) {
            newBlackTiles.add(key)

            if (x > maxX) maxX = x
            else if (x < minX) minX = x

            if (y > maxY) maxY = y
            else if (y < minY) minY = y
          }
        }
      })
    })

    blackTiles = newBlackTiles
  })

  return blackTiles.size
}

module.exports = {
  part1,
  part2
}
