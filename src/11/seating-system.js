const { inRange, cloneDeep } = require('lodash/fp')

const OCCUPIED = '#'
const EMPTY = 'L'
const FLOOR = '.'

const findSeatPositions = (seatGrid) => {
  const seatPositions = []

  seatGrid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell !== FLOOR) {
        seatPositions.push([rowIdx, colIdx])
      }
    })
  })

  return seatPositions
}

const countNeigbours = (seatGrid, row, col, { expandSearch } = {}) => {
  const inHeightRange = inRange(0)(seatGrid.length)
  const inWidthRange = inRange(0)(seatGrid[0].length)
  const surrouding = [-1, 0, 1]

  let neighbours = 0

  surrouding.forEach((deltaRow) => {
    surrouding.forEach((deltaCol) => {
      if (deltaRow === 0 && deltaCol === 0) {
        return
      }

      let newRow = row + deltaRow
      let newCol = col + deltaCol
      while (inHeightRange(newRow) && inWidthRange(newCol)) {
        if (seatGrid[newRow][newCol] !== FLOOR) {
          if (seatGrid[newRow][newCol] === OCCUPIED) {
            neighbours++
          }

          return
        }

        if (!expandSearch) {
          return
        }

        newRow += deltaRow
        newCol += deltaCol
      }
    })
  })

  return neighbours
}

const calculateOccupiedSeats = (seatGrid, { expandNeighbourSearch, maxNeighboursThreshold }) => {
  const seatPositions = findSeatPositions(seatGrid)
  let currentSeatGrid = seatGrid

  while (true) {
    const newSeats = cloneDeep(currentSeatGrid)

    let hasChange = false

    seatPositions.forEach(([row, col]) => {
      const neighbours = countNeigbours(currentSeatGrid, row, col, { expandSearch: expandNeighbourSearch })
      if (currentSeatGrid[row][col] === EMPTY) {
        if (neighbours === 0) {
          hasChange = true
          newSeats[row][col] = OCCUPIED
        }
      } else { // currentSeat === OCCUPIED
        if (neighbours >= maxNeighboursThreshold) {
          hasChange = true
          newSeats[row][col] = EMPTY
        }
      }
    })

    currentSeatGrid = newSeats

    if (!hasChange) {
      break
    }
  }

  return seatPositions
    .map(([row, col]) => currentSeatGrid[row][col])
    .filter((seat) => seat === OCCUPIED)
    .length
}

const part1 = (seatGrid) => calculateOccupiedSeats(seatGrid, { expandNeighbourSearch: false, maxNeighboursThreshold: 4 })

const part2 = (seatGrid) => calculateOccupiedSeats(seatGrid, { expandNeighbourSearch: true, maxNeighboursThreshold: 5 })

module.exports = {
  part1,
  part2
}
