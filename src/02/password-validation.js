const parsePasswordAndPolicies = (passwordsWithPolicy) => {
  const [policy, password] = passwordsWithPolicy.split(': ')
  const [nums, letter] = policy.split(' ')
  const [num1, num2] = nums.split('-')

  return {
    policy: { num1, num2, letter },
    password
  }
}

const letterCountPasswordPredicate = (password, { num1, num2, letter }) => {
  const targetLetterCount = password.replace(new RegExp(`[^${letter}]`, 'g'), '').length
  return targetLetterCount >= num1 && targetLetterCount <= num2
}

const letterPositionPasswordPredicate = (password, { num1, num2, letter }) => {
  const parseCharAt = (num) => password.charAt(parseInt(num) - 1)
  const char1 = parseCharAt(num1)
  const char2 = parseCharAt(num2)
  return (char1 === letter) !== (char2 === letter)
}

const countValidPasswords = (passwordsWithPolicy, policyPredicate) => {
  return passwordsWithPolicy
    .map(passwordWithPolicy => parsePasswordAndPolicies(passwordWithPolicy))
    .filter(({ password, policy }) => policyPredicate(password, policy))
    .length
}

module.exports = {
  countValidPasswords,
  letterCountPasswordPredicate,
  letterPositionPasswordPredicate
}
