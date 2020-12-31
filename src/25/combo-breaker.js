const { strictEqual } = require('assert')

const transform = (subject, { targetLoopSize, targetValue }) => {
  let loopSize = 0
  let value = 1

  const isFinished = () => targetLoopSize ? loopSize === targetLoopSize : value === targetValue

  while (!isFinished()) {
    value = (value * subject) % 20201227
    loopSize++
  }

  return { loopSize, value }
}

const part1 = (cardPublicKey, doorPublicKey) => {
  const { loopSize: cardLoopSize } = transform(7, { targetValue: cardPublicKey })
  const { loopSize: doorLoopSize } = transform(7, { targetValue: doorPublicKey })

  const { value: cardEncryptionKey } = transform(doorPublicKey, { targetLoopSize: cardLoopSize })
  const { value: doorEncryptionKey } = transform(cardPublicKey, { targetLoopSize: doorLoopSize })

  strictEqual(cardEncryptionKey, doorEncryptionKey, 'keys do not match')

  return cardEncryptionKey
}

module.exports = {
  part1
}
