const { range } = require('lodash')

const parseRuleCriteria = (criteriaString) => {
  if (criteriaString.startsWith('"')) {
    return { letter: criteriaString.slice(1, -1) }
  }

  const criterias = criteriaString
    .split(' | ')
    .map((subCriteria) => subCriteria.split(' '))

  return { criterias }
}

const createRuleMap = (rules) => {
  const ruleMap = {}

  rules.forEach((rule) => {
    const [number, criteria] = rule.split(': ')
    ruleMap[number] = parseRuleCriteria(criteria)
  })

  return ruleMap
}

const buildRegexStringForRuleMap = (ruleMap) => {
  const buildRegexString = (rule) => {
    const { letter, criterias } = ruleMap[rule]

    if (letter) {
      return letter
    }

    const criteriaRegex = criterias
      .map((subCriterias) => subCriterias.map(buildRegexString).join(''))
      .join('|')

    return criterias.length === 1 ? criteriaRegex : `(?:${criteriaRegex})`
  }

  return buildRegexString
}

const part1 = (rules, messages) => {
  const ruleMap = createRuleMap(rules)

  const buildRegexString = buildRegexStringForRuleMap(ruleMap)

  const regex = new RegExp(`^${buildRegexString('0')}$`)

  return messages
    .filter((line) => regex.test(line))
    .length
}

const part2 = (rules, messages) => {
  const ruleMap = createRuleMap(rules)

  const buildRegexString = buildRegexStringForRuleMap(ruleMap)

  // we now hard code the following rules
  //  - 0: 8 11
  //  - 8: 42 | 42 8 => 42+
  //  - 11: 42 31 | 42 11 31 => 42{n}31{n} for n > 1

  const regex42 = buildRegexString('42')
  const regex31 = buildRegexString('31')

  const regex11 = range(1, 10) // this is a very evil hack
    .map((i) => `(?:(?:${regex42}){${i}}(?:${regex31}){${i}})`)
    .join('|')

  const regex0 = `(?:${regex42})+(?:${regex11})`

  const regex = new RegExp(`^${regex0}$`)

  return messages
    .filter((line) => regex.test(line))
    .length
}

module.exports = {
  part1,
  part2
}
