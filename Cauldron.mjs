import ArrantPrack from "./ArrantPrack.mjs"
import Elixir from "./Elixir.mjs"
import Poison from "./Poison.mjs"
import Sanity from "./Sanity.mjs"

export default class Cauldron {
  constructor(ingredients) {
    this.ingredients = ingredients

    this.ingredient1 = null
    this.ingredient2 = null

    this.mod = null
    this.value = null
    this.weight = null
    this.time = null
    this.effect = null
  }

  createPotion(name1, name2) {

    let potion = null

    let weight = null
    let value = null
    let time = null

    // extraer información de cada ingrediente
    this.extractIngredients(name1, name2)

    let nameElixir = `${this.mod} elixir of ${this.name}`
    let namePoison = `${this.mod} poison of ${this.name}`

    if (this.isElixir()) {
      potion = new Elixir(nameElixir, value, weight = 10, time = "time")
    } else if (this.isPoison()) {
      potion = new Poison(namePoison, value, weight = 10, time = "time")
    } else if (this.isSanity()) {
      potion = new Sanity("Poison of Sanity", 1000, 1, 10)
    } else  potion = new ArrantPrack("ArrantPrack", 1, 0, 1)

    // devolver la pocion creada
    return potion
  }

  extractIngredients(name1, name2) {
    for (let i = 0; i < this.ingredients.length; i++) {
      const ing = this.ingredients[i];

      if (ing.name === name1) {
        this.ingredient1 = ing
      }

      if (ing.name === name2) {
        this.ingredient2 = ing
      }
    }
  }

  isElixir() {

    let cont1 = 0
    let cont2 = 0
    let elixir = false

    const positiveEffects = ["Fortifity", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"]

    for (let i = 0; i < this.ingredient1.effects.length; i++) {
      const effect = this.ingredient1.effects[i];

      for (let i = 0; i < positiveEffects.length; i++) {
        const posi = positiveEffects[i];

        if (effect.includes(posi)) {
          cont1++
        }
      }
    }

    for (let i = 0; i < this.ingredient2.effects.length; i++) {
      const effect = this.ingredient2.effects[i];

      for (let i = 0; i < positiveEffects.length; i++) {
        const posi = positiveEffects[i];

        if (effect.includes(posi)) {
          cont2++
        }
      }
    }

    if (cont1 >= 1 && cont2 < 1) {
      this.mod = "Leeser"
      elixir = true
    }

    if (cont2 >= 1 && cont1 < 1) {
      this.mod = "Leeser"
      elixir = true
    }

    if (cont1 >= 1 && cont2 >= 1) {
      this.mod = "Greater"
      elixir = true
    }
    if (cont1 < 1 && cont2 < 1) {
      elixir = false
    }

    return elixir
  }

  isPoison() {

    let contNeg1 = 0
    let contNeg2 = 0
    let poison = false

    const negativeEffects = ["Weakness", "Damage", "Ravage", "Frenzy", "Fear", "Paralisis", "Slow"]

    for (let i = 0; i < this.ingredient1.effects.length; i++) {
      const effect = this.ingredient1.effects[i];

      for (let i = 0; i < negativeEffects.length; i++) {
        const nega = negativeEffects[i];

        if (effect.includes(nega)) {
          contNeg1++
        }
      }
    }

    for (let i = 0; i < this.ingredient2.effects.length; i++) {
      const effect = this.ingredient2.effects[i];

      for (let i = 0; i < negativeEffects.length; i++) {
        const nega = negativeEffects[i];

        if (effect.includes(nega)) {
          contNeg2++
        }
      }
    }

    if (contNeg1 >= 1 && contNeg2 < 1) {
      this.mod = "Leeser"
      poison = true
    }

    if (contNeg2 >= 1 && contNeg1 < 1) {
      this.mod = "Leeser"
      poison = true
    }

    if (contNeg1 >= 1 && contNeg2 >= 1) {
      this.mod = "Greater"
      poison = true
    }
    if (contNeg1 < 1 && contNeg2 < 1) {
      poison = false
    }

    return poison
  }

  isSanity() {
    if (this.ingredient1.name === "Nightshade" && this.ingredient2.name === "Ectoplasm") {
      return true
    }
  }
}