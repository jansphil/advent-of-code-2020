const { sortBy } = require('lodash')

const run = (input) => {
  const allergenToIngredients = {}
  const ingredientsWithoutAllergen = new Set()
  const identifiedAllergens = []

  const menu = input.map((line) => {
    const [ingredientList, allergenList] = line.split(' (')
    const ingredients = ingredientList.split(' ')
    const allergens = allergenList.slice(9, -1).split(', ')

    allergens.forEach((allergen) => {
      if (!allergenToIngredients[allergen]) {
        allergenToIngredients[allergen] = []
      }
      allergenToIngredients[allergen].push(ingredients)
    })

    ingredients.forEach((i) => ingredientsWithoutAllergen.add(i))

    return { ingredients, allergens }
  })

  let allergens = Object.keys(allergenToIngredients)

  const removeIdentifiedIngredient = (ingredient) => {
    allergens.forEach((allergen) => {
      allergenToIngredients[allergen] = allergenToIngredients[allergen]
        .map((ingredients) => ingredients.filter((i) => i !== ingredient))
    })

    ingredientsWithoutAllergen.delete(ingredient)
  }

  let foundMatch
  do {
    foundMatch = false

    for (const allergen of allergens) {
      const ingredientsInAllRecipes = allergenToIngredients[allergen]
        .reduce((acc, cur) => acc.filter((ingredient) => cur.includes(ingredient)))

      if (ingredientsInAllRecipes.length === 1) {
        identifiedAllergens.push({ allergen, ingredient: ingredientsInAllRecipes[0] })
        removeIdentifiedIngredient(ingredientsInAllRecipes[0])
        allergens = allergens.filter((a) => a !== allergen)

        foundMatch = true
        continue
      }
    }
  } while (foundMatch)

  const part1 = menu
    .map(({ ingredients }) => {
      return ingredients
        .filter((ingredient) => ingredientsWithoutAllergen.has(ingredient))
        .length
    })
    .reduce((acc, cur) => acc + cur)

  const part2 = sortBy(identifiedAllergens, 'allergen')
    .map(({ ingredient }) => ingredient)
    .join(',')

  return { part1, part2 }
}

module.exports = {
  run
}
