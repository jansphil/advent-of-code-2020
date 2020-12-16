const { range } = require('lodash')

const parseTicketBlock = (input) =>
  input.split('\n')
    .slice(1)
    .map((line) => line.split(',').map(Number))

const parseRange = (range) => {
  const [from, to] = range.split('-').map(Number)
  return { from, to }
}

const parseRules = (input) =>
  input.split('\n')
    .map((line) => line.match(/^([a-z ]+): ([0-9-]+) or ([0-9-]+)$/).slice(1))
    .map(([name, ...ranges]) => ({ name, ranges: ranges.map(parseRange) }))

const parseFile = (input) => {
  const [rules, ownTicket, otherTickets] = input.split('\n\n')

  return {
    rules: parseRules(rules),
    ownTicket: parseTicketBlock(ownTicket)[0],
    otherTickets: parseTicketBlock(otherTickets)
  }
}

const part1 = (input) => {
  const { otherTickets, rules } = parseFile(input)

  const validForAnyRule = (value) =>
    rules.some(({ ranges }) => ranges.some(({ from, to }) => value >= from && value <= to))

  return otherTickets
    .flatMap((ticket) => ticket.filter((value) => !validForAnyRule(value)))
    .reduce((a, b) => a + b)
}

const part2 = (input) => {
  const { otherTickets, ownTicket, rules } = parseFile(input)

  const validRulesForValue = (value) =>
    rules.filter(({ ranges }) => ranges.some(({ from, to }) => value >= from && value <= to))
      .map(({ name }) => name)

  let validFieldNamesPerPosition = otherTickets
    .map((ticket) => ticket.map(validRulesForValue))
    .filter((ticket) => ticket.every((validRules) => validRules.length !== 0))
    .reduce((acc, cur) => acc.map((validRules, i) => validRules.filter((rule) => cur[i].includes(rule))))

  const identifiedFields = {}
  let unidentifiedFields = range(validFieldNamesPerPosition.length)
  while (unidentifiedFields.length > 0) {
    const fieldIndex = unidentifiedFields.find((fieldIndex) => validFieldNamesPerPosition[fieldIndex].length === 1)
    const fieldName = validFieldNamesPerPosition[fieldIndex][0]
    identifiedFields[fieldName] = fieldIndex

    unidentifiedFields = unidentifiedFields.filter((index) => index !== fieldIndex)
    validFieldNamesPerPosition = validFieldNamesPerPosition.map((position) => position.filter((field) => field !== fieldName))
  }

  return Object.entries(identifiedFields)
    .filter(([key, _value]) => key.startsWith('departure'))
    .map(([_key, value]) => ownTicket[value])
    .reduce((acc, cur) => acc * cur)
}

module.exports = {
  part1,
  part2
}
