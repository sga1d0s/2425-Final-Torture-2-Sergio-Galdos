import ArrantPrack from "./ArrantPrack.mjs"
import Elixir from "./Elixir.mjs"
import Poison from "./Poison.mjs"
import Sanity from "./Sanity.mjs"

export default class Cauldron {
  constructor(ingredients) {
    this.ingredients = ingredients

    this.i1 = null
    this.i2 = null

    this.mod = null
    this.name = null
  }

  createPotion(name1, name2) {

    let potion = null

    let weight = null
    let value = null
    let time = null

    // extraer información de cada ingrediente
    this.extractIngredients(name1, name2)

    let namePoison = `${this.mod} poison of ${this.name}`

    if (this.isSanity()) {
      potion = new Sanity("Poison of Sanity", 1000, 1, 10)
    } else if (this.isElixir()) {
      potion = new Elixir(`${this.mod} elixir of ${this.name}`, value, weight = 10, time = "time")
    } else /* if (this.isPoison()) {
      potion = new Poison(namePoison, value, weight = 10, time = "time")
    } else  */ potion = new ArrantPrack("ArrantPrack", 1, 0, 1)

    // devolver la pocion creada
    return potion
  }

  extractIngredients(name1, name2) {
    for (let i = 0; i < this.ingredients.length; i++) {
      const ing = this.ingredients[i];

      if (ing.name === name1) {
        this.i1 = ing
      }

      if (ing.name === name2) {
        this.i2 = ing
      }
    }
  }

  isElixir() {
    const negativeEffects = ["Weakness", "Damage", "Ravage", "Frenzy", "Fear", "Paralisis", "Slow"]
    const positiveEffects = ["Fortify", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"]

    const commonEffects = []

    let elixir = false

    for (let i = 0; i < this.i1.effects.length; i++) {
      const effect1 = this.i1.effects[i];

      for (let j = 0; j < this.i2.effects.length; j++) {
        const effect2 = this.i2.effects[j];

        if (effect1 === effect2) {

          // dividir en palabras effect2
          let effectWords = effect2.split(" ")

          // comparar cada palabra con el array de positivos y negativos
          for (let k = 0; k < effectWords.length; k++) {
            const element = effectWords[k];

            if (positiveEffects.includes(element)) {

              commonEffects.push(effect2)
     
              elixir = true

              if (commonEffects.length === 1) {
                this.mod = "Leeser"
                this.name = commonEffects
              }
              if (commonEffects.length > 1) {
                this.mod = "Greater"
                this.name = commonEffects
              }
            }
          }
        }
      }
    }

    return elixir
  }

  isSanity() {
    if ((this.i1.name === "Nightshade" && this.i2.name === "Ectoplasm") ||
      (this.i2.name === "Nightshade" && this.i1.name === "Ectoplasm")) {
      return true
    }
  }
}