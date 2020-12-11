const SEAT_OCCUPIED = 'OCCUPIED'
const SEAT_EMPTY = 'EMPTY'
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

const toKey = (rowIndex, colIndex) => `${rowIndex}-${colIndex}`
const fromKey = (key) => key.split('-').map((index) => parseInt(index))

// finding and saving seats with coordinates for faster access
const findSeats = (input) => {
  const height = input.length
  const width = input[0].length

  const seats = {}

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    for (let colIndex = 0; colIndex < width; colIndex++) {
      if (input[rowIndex][colIndex] === 'L') {
        // while it might be nicer to store it directly as a boolean, to handle
        // differences between undefined and empty vs. occupied a string is better
        seats[toKey(rowIndex, colIndex)] = SEAT_EMPTY
      }
    }
  }

  return seats
}

const countOccupiedSeats = (seats) =>
  Object.values(seats)
    .filter((seat) => seat === SEAT_OCCUPIED)
    .length

const part1 = (input) => {
  let seats = findSeats(input)

  const countNeighbours = (sourceRowIndex, sourceColumnIndex) => {
    let neighbourCount = 0

    for (let rowIndex = sourceRowIndex - 1; rowIndex <= sourceRowIndex + 1; rowIndex++) {
      for (let colIndex = sourceColumnIndex - 1; colIndex <= sourceColumnIndex + 1; colIndex++) {
        if (rowIndex === sourceRowIndex && colIndex === sourceColumnIndex) {
          continue
        }

        const neighbour = seats[toKey(rowIndex, colIndex)]
        if (neighbour && neighbour === SEAT_OCCUPIED) {
          neighbourCount++
        }
      }
    }

    return neighbourCount
  }

  let somethingChanged
  do {
    somethingChanged = false

    const nextSeatsCyle = {}
    Object.entries(seats).forEach(([key, value]) => {
      const [rowIndex, colIndex] = fromKey(key)
      const neighbours = countNeighbours(rowIndex, colIndex)

      if (seats[key] === SEAT_EMPTY && neighbours === 0) {
        nextSeatsCyle[key] = SEAT_OCCUPIED
        somethingChanged = true
      } else if (seats[key] === SEAT_OCCUPIED && neighbours >= 4) {
        nextSeatsCyle[key] = SEAT_EMPTY
        somethingChanged = true
      } else {
        nextSeatsCyle[key] = seats[key]
      }
    })

    seats = nextSeatsCyle
  } while (somethingChanged)

  return countOccupiedSeats(seats)
}

const part2 = (input) => {
  const height = input.length
  const width = input[0].length
  let seats = findSeats(input)

  const countNeighbours = (sourceRowIndex, sourceColumnIndex) => {
    let neighbourCount = 0

    DIRECTIONS.forEach(([rowDelta, colDelta]) => {
      let i = 1

      const rowIndex = () => sourceRowIndex + rowDelta * i
      const colIndex = () => sourceColumnIndex + colDelta * i
      const inBounds = () => rowIndex() >= 0 && rowIndex() < height && colIndex() >= 0 && colIndex() < width

      // expand until a seat is found or we are out of bounds
      while (inBounds() && !seats[toKey(rowIndex(), colIndex())]) {
        i++
      }

      if (inBounds() && seats[toKey(rowIndex(), colIndex())] === SEAT_OCCUPIED) {
        neighbourCount++
      }
    })

    return neighbourCount
  }

  let somethingChanged
  do {
    somethingChanged = false

    const nextSeatsCyle = {}
    Object.entries(seats).forEach(([key, value]) => {
      const [rowIndex, colIndex] = fromKey(key)
      const neighbours = countNeighbours(rowIndex, colIndex)

      if (seats[key] === SEAT_EMPTY && neighbours === 0) {
        nextSeatsCyle[key] = SEAT_OCCUPIED
        somethingChanged = true
      } else if (seats[key] === SEAT_OCCUPIED && neighbours >= 5) {
        nextSeatsCyle[key] = SEAT_EMPTY
        somethingChanged = true
      } else {
        nextSeatsCyle[key] = seats[key]
      }
    })

    seats = nextSeatsCyle
  } while (somethingChanged)

  return countOccupiedSeats(seats)
}

module.exports = {
  part1,
  part2
}
