

export default class Ingredient {
  constructor(name, effects = [], value, weight){
    this.name = name
    this.effects = effects
    this.value = value
    this.weight = weight
  }

/*   create(ingredients){
    const ingredientArray = []
    for (let i = 0; i < ingredients.length; i++) {
      const ing = ingredients[i];

      ingredientArray.push(new Ingredient(
        ing.name, 
        ing.effects,
        ing.value,
        ing.weight,
      ))
    }

    return ingredientArray
  } */

  create(ing){
    return new Ingredient(ing.name, ing.effects, ing.value, ing.weight)
  }
}