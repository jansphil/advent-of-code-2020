const { times, range, cloneDeep } = require('lodash')

const ACTIVE = '#'

const part1 = (initialState) => {
  // holds the active cubes, by z, y, and x coordinates
  // e.g. space[0][1][2] refers to the cube at z = 0, y = 1, x = 2
  // additionally, store the size to iterate more easily
  let currentSpace = { 0: {}, size: { lowerX: 0, upperX: 0, lowerY: 0, upperY: 0, lowerZ: 0, upperZ: 0 } }

  const addActiveCell = (space, x, y, z) => {
    if (!space[z]) {
      space[z] = {}

      if (z > space.size.upperZ) {
        space.size.upperZ = z
      } else if (z < space.size.lowerZ) {
        space.size.lowerZ = z
      }
    }

    if (!space[z][y]) {
      space[z][y] = {}

      if (y > space.size.upperY) {
        space.size.upperY = y
      } else if (y < space.size.lowerY) {
        space.size.lowerY = y
      }
    }

    space[z][y][x] = true

    if (x > space.size.upperX) {
      space.size.upperX = x
    } else if (x < space.size.lowerX) {
      space.size.lowerX = x
    }
  }

  const isActive = (space, x, y, z) => space[z]?.[y]?.[x] ?? false

  const countActiveNeighbours = (space, x, y, z) => {
    let activeNeighbours = 0

    range(z - 1, z + 2).forEach((zz) => {
      range(y - 1, y + 2).forEach((yy) => {
        range(x - 1, x + 2).forEach((xx) => {
          if (xx === x && yy === y && zz === z) {
            return
          }

          if (isActive(space, xx, yy, zz)) {
            activeNeighbours++
          }
        })
      })
    })

    return activeNeighbours
  }

  initialState.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === ACTIVE) {
        addActiveCell(currentSpace, x, y, 0)
      }
    })
  })

  times(6, () => {
    const nextSpace = cloneDeep(currentSpace)
    range(currentSpace.size.lowerZ - 1, currentSpace.size.upperZ + 2).forEach((z) => {
      range(currentSpace.size.lowerY - 1, currentSpace.size.upperY + 2).forEach((y) => {
        range(currentSpace.size.lowerX - 1, currentSpace.size.upperX + 2).forEach((x) => {
          const activeNeighbours = countActiveNeighbours(currentSpace, x, y, z)
          const isCellActive = isActive(currentSpace, x, y, z)
          if (isCellActive) {
            if (![2, 3].includes(activeNeighbours)) {
              delete nextSpace[z][y][x]
            }
          } else {
            if (activeNeighbours === 3) {
              addActiveCell(nextSpace, x, y, z)
            }
          }
        })
      })
    })

    currentSpace = nextSpace
  })

  let count = 0

  range(currentSpace.size.lowerZ, currentSpace.size.upperZ + 1).forEach((z) => {
    range(currentSpace.size.lowerY, currentSpace.size.upperY + 1).forEach((y) => {
      range(currentSpace.size.lowerX, currentSpace.size.upperX + 1).forEach((x) => {
        if (isActive(currentSpace, x, y, z)) {
          count++
        }
      })
    })
  })

  return count
}

const part2 = (initialState) => {
  let currentSpace = { 0: { 0: {} }, size: { lowerX: 0, upperX: 0, lowerY: 0, upperY: 0, lowerZ: 0, upperZ: 0, lowerW: 0, upperW: 0 } }

  const addActiveCell = (space, x, y, z, w) => {
    if (!space[w]) {
      space[w] = {}

      if (w > space.size.upperW) {
        space.size.upperW = w
      } else if (w < space.size.lowerW) {
        space.size.lowerW = w
      }
    }

    if (!space[w][z]) {
      space[w][z] = {}

      if (z > space.size.upperZ) {
        space.size.upperZ = z
      } else if (z < space.size.lowerZ) {
        space.size.lowerZ = z
      }
    }

    if (!space[w][z][y]) {
      space[w][z][y] = {}

      if (y > space.size.upperY) {
        space.size.upperY = y
      } else if (y < space.size.lowerY) {
        space.size.lowerY = y
      }
    }

    space[w][z][y][x] = true

    if (x > space.size.upperX) {
      space.size.upperX = x
    } else if (x < space.size.lowerX) {
      space.size.lowerX = x
    }
  }

  const isActive = (space, x, y, z, w) => space[w]?.[z]?.[y]?.[x] ?? false

  const countActiveNeighbours = (space, x, y, z, w) => {
    let activeNeighbours = 0

    range(w - 1, w + 2).forEach((ww) => {
      range(z - 1, z + 2).forEach((zz) => {
        range(y - 1, y + 2).forEach((yy) => {
          range(x - 1, x + 2).forEach((xx) => {
            if (xx === x && yy === y && zz === z && ww === w) {
              return
            }

            if (isActive(space, xx, yy, zz, ww)) {
              activeNeighbours++
            }
          })
        })
      })
    })

    return activeNeighbours
  }

  initialState.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === ACTIVE) {
        addActiveCell(currentSpace, x, y, 0, 0)
      }
    })
  })

  times(6, () => {
    const nextSpace = cloneDeep(currentSpace)
    range(currentSpace.size.lowerW - 1, currentSpace.size.upperW + 2).forEach((w) => {
      range(currentSpace.size.lowerZ - 1, currentSpace.size.upperZ + 2).forEach((z) => {
        range(currentSpace.size.lowerY - 1, currentSpace.size.upperY + 2).forEach((y) => {
          range(currentSpace.size.lowerX - 1, currentSpace.size.upperX + 2).forEach((x) => {
            const activeNeighbours = countActiveNeighbours(currentSpace, x, y, z, w)
            const isCellActive = isActive(currentSpace, x, y, z, w)
            if (isCellActive) {
              if (![2, 3].includes(activeNeighbours)) {
                delete nextSpace[w][z][y][x]
              }
            } else {
              if (activeNeighbours === 3) {
                addActiveCell(nextSpace, x, y, z, w)
              }
            }
          })
        })
      })
    })

    currentSpace = nextSpace
  })

  let count = 0

  range(currentSpace.size.lowerW, currentSpace.size.upperW + 1).forEach((w) => {
    range(currentSpace.size.lowerZ, currentSpace.size.upperZ + 1).forEach((z) => {
      range(currentSpace.size.lowerY, currentSpace.size.upperY + 1).forEach((y) => {
        range(currentSpace.size.lowerX, currentSpace.size.upperX + 1).forEach((x) => {
          if (isActive(currentSpace, x, y, z, w)) {
            count++
          }
        })
      })
    })
  })

  return count
}

module.exports = {
  part1,
  part2
}
