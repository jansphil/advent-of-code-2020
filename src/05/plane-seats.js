const split = require('split')
const { Transform } = require('stream')
const { splitStringAt, transformString } = require('../utils')

const seatCodeToBinary = { F: '0', B: '1', L: '0', R: '1' }

const createSeatParser = () => {
  const parseSeatCode = (seatCode) => {
    const seatCodeBinary = transformString(seatCode, seatCodeToBinary)
    const [row, column] = splitStringAt(seatCodeBinary, 7).map((binary) => parseInt(binary, 2))
    return { row, column, id: row * 8 + column }
  }

  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      next(null, parseSeatCode(chunk.toString()))
    }
  })
}

const createHighestSeatIdReducer = () => {
  let highestSeatId

  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      if (!highestSeatId || chunk.id > highestSeatId) {
        highestSeatId = chunk.id
      }
      next()
    },
    flush (done) {
      done(null, highestSeatId)
    }
  })
}

const createSeatEdgesReducer = () => {
  const seatEdges = {}

  const processSeatId = (id) => {
    const lowerNeighbour = seatEdges[id - 1]
    const upperNeighbour = seatEdges[id + 1]

    seatEdges[id] = { seatsOnLeft: false, seatsOnRight: false }

    if (!lowerNeighbour && !upperNeighbour) {
      return
    }

    if (lowerNeighbour) {
      seatEdges[id].seatsOnLeft = true
      if (lowerNeighbour.seatsOnLeft) {
        delete seatEdges[id - 1]
      } else {
        lowerNeighbour.seatsOnRight = true
      }
    }

    if (upperNeighbour) {
      seatEdges[id].seatsOnRight = true
      if (upperNeighbour.seatsOnRight) {
        delete seatEdges[id + 1]
      } else {
        upperNeighbour.seatsOnLeft = true
      }
    }

    if (seatEdges[id].seatsOnRight && seatEdges[id].seatsOnLeft) {
      delete seatEdges[id]
    }
  }

  const getEmptySeatInTheMiddle = () => {
    return Object.keys(seatEdges)
      .map(seatId => parseInt(seatId))
      .sort((a, b) => a - b)[1] + 1
  }

  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      processSeatId(chunk.id)
      next()
    },
    flush (done) {
      done(null, getEmptySeatInTheMiddle())
    }
  })
}

const getHighestSeatId = (inputStream) => {
  return new Promise((resolve, reject) => {
    inputStream
      .pipe(split())
      .pipe(createSeatParser())
      .pipe(createHighestSeatIdReducer())
      .on('data', (seatId) => resolve(seatId))
      .on('error', (err) => reject(err))
  })
}

const findEmptySeat = (inputStream) => {
  return new Promise((resolve, reject) => {
    inputStream
      .pipe(split())
      .pipe(createSeatParser())
      .pipe(createSeatEdgesReducer())
      .on('data', (seatId) => resolve(seatId))
      .on('error', (err) => reject(err))
  })
}

module.exports = {
  getHighestSeatId,
  findEmptySeat
}
