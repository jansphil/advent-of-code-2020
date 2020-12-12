const { times } = require('lodash')

const rotations = {
  L: { E: 'N', N: 'W', W: 'S', S: 'E' },
  R: { E: 'S', S: 'W', W: 'N', N: 'E' }
}

const waypointRotations = {
  L: ([x, y]) => [-y, x],
  R: ([x, y]) => [y, -x]
}

const directions = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1]
}

const distance = ([x, y]) => Math.abs(x) + Math.abs(y)

const lineRegex = /^(\w)(\d+)$/

const part1 = (input) => {
  const position = [0, 0]
  let orientation = 'E'

  input
    .map((line) => line.match(lineRegex).slice(1))
    .forEach(([command, value]) => {
      if (directions[command]) { // N, E, S, W
        times(parseInt(value), (_) => {
          position[0] += directions[command][0]
          position[1] += directions[command][1]
        })
      } else if (rotations[command]) { // L, R
        times(Math.round(parseInt(value) / 90), (_) => {
          orientation = rotations[command][orientation]
        })
      } else { // F
        times(parseInt(value), (_) => {
          position[0] += directions[orientation][0]
          position[1] += directions[orientation][1]
        })
      }
    })

  return distance(position)
}

const part2 = (input) => {
  const position = [0, 0]
  let waypoint = [-1, 10]

  input
    .map((line) => line.match(lineRegex).slice(1))
    .forEach(([command, value]) => {
      if (directions[command]) { // N, E, S, W
        times(parseInt(value), (_) => {
          waypoint[0] += directions[command][0]
          waypoint[1] += directions[command][1]
        })
      } else if (rotations[command]) { // L, R
        times(Math.round(parseInt(value) / 90), (_) => {
          waypoint = waypointRotations[command](waypoint)
        })
      } else { // F
        times(parseInt(value), (_) => {
          position[0] += waypoint[0]
          position[1] += waypoint[1]
        })
      }
    })

  return distance(position)
}

module.exports = {
  part1,
  part2
}
