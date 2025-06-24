
export default class Ingredient {
  constructor(name, effects = [], value, weight){
    this.name = name
    this.effects = effects
    this.value = value
    this.weight = weight
  }

  static create(ing){
    return new Ingredient(ing.name, ing.effects, ing.value, ing.weight)
  }
}