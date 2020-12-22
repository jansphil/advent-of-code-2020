const { sum, reverse, flow } = require('lodash/fp')

const calculateScore = flow(
  reverse,
  (cards) => cards.map((card, i) => card * (i + 1)),
  sum
)

const part1 = (input) => {
  const player1 = [...input[0]]
  const player2 = [...input[1]]

  while (player1.length > 0 && player2.length > 0) {
    const a = player1.shift()
    const b = player2.shift()

    if (a > b) {
      player1.push(a, b)
    } else {
      player2.push(b, a)
    }
  }

  return calculateScore(player1.length > 0 ? player1 : player2)
}

const part2 = (input) => {
  const recursiveCrabCombat = (player1, player2) => {
    const deckHistory = new Set()

    while (player1.length > 0 && player2.length > 0) {
      const deck = `${player1.join('.')}-${player2.join('.')}`
      if (deckHistory.has(deck)) {
        return { winner: 1, cards: player1 }
      } else {
        deckHistory.add(deck)
      }

      const a = player1.shift()
      const b = player2.shift()

      if (player1.length >= a && player2.length >= b) {
        const { winner } = recursiveCrabCombat(player1.slice(0, a), player2.slice(0, b))
        if (winner === 1) {
          player1.push(a, b)
        } else {
          player2.push(b, a)
        }
      } else if (a > b) {
        player1.push(a, b)
      } else {
        player2.push(b, a)
      }
    }

    return player1.length > 0 ? { winner: 1, cards: player1 } : { winner: 2, cards: player2 }
  }

  const { cards } = recursiveCrabCombat([...input[0]], [...input[1]])
  return calculateScore(cards)
}

module.exports = {
  part1,
  part2
}
