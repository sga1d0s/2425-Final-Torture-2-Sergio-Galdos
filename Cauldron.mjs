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
  }

  createPotion(name1, name2) {

    let potion = null
    let mod = null
    let effectName = null

    let weight = null
    let value = null
    let time = null

    const positiveEffects = ["Fortifity", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"]

    let contPos1 = 0
    let contPos2 = 0
    let contNeg = 0

    let isElixir = false
    let isLeeser = false
    let isGreater = false

    // extraer información de cada ingrediente
    this.extractIngredients(name1, name2)

    //contar efectos positivos ing 1
    for (let i = 0; i < this.ingredient1.effects.length; i++) {
      const effect = this.ingredient1.effects[i];
      for (let j = 0; j < positiveEffects.length; j++) {
        const positiveEfect = positiveEffects[j];

        if (effect.includes(positiveEfect)) {
          contPos1++
        }
      }
    }

    // contar efectos positivos ing2
    for (let i = 0; i < this.ingredient2.effects.length; i++) {
      const effect = this.ingredient2.effects[i];

      for (let j = 0; j < positiveEffects.length; j++) {
        const positiveEfect = positiveEffects[j];

        if (effect.includes(positiveEfect)) {
          contPos2++
        }
      }
    }

    if (contPos1 >= 1 && contPos2 >= 1) {
      isElixir = true
      if (contPos1 === 0 || contPos2 === 0) {
        mod = "Leeser"
        value = this.ingredient1.value + this.ingredient2.value
      } else {
        mod = "Greater"
        value = this.ingredient1.value + this.ingredient2.value * 3
      }
    }

    let nameElixir = `${mod} elixir of ${effectName}`
    let namePoison = `${mod} poison of ${effectName}`
    let nameSanity = "Poison of Sanity"

    if (isElixir) {
      potion = new Elixir(nameElixir, value, weight = 10, time = "time")
    }

    if (this.isPoison()) {
      return new Poison(namePoison, value, weight = 10, time = "time")
    }

    if (this.isSanity()) {
      return new Sanity(nameSanity, 1000, 1, 10)
    }

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

  isPoison() {

    let contNeg1 = 0
    let contNeg2 = 0
    let poison = false

    const negativeEffects = ["Weakness", "Damage", "Ravage", "Frenzy", "Fear", "Paralisis", "Slow"]
    // const negativeEffects = "Weakness Damage Ravage Frenzy Fear Paralisis Slow"

    for (let i = 0; i < this.ingredient1.effects.length; i++) {
      const effect = this.ingredient1[i];

      for (let i = 0; i < negativeEffects.length; i++) {
        const nega = negativeEffects[i];

        if (effect === nega) {
          contNeg1++
        }
      }
    }

    for (let i = 0; i < this.ingredient2.effects.length; i++) {
      const effect = this.ingredient2[i];

      for (let i = 0; i < negativeEffects.length; i++) {
        const nega = negativeEffects[i];

        if (effect === nega) {
          contNeg2++
        }
      }
    }

    if (contNeg1 >= 1 && contNeg2 === 0) {
      this.mod = "Leeser"
      poison = true
    }

    if (contNeg2 >= 1 && contNeg1 === 0) {
      this.mod = "Leeser"
      poison = true
    }

    if (contNeg1 >= 1 && contNeg2 >= 1) {
      this.mod = "Greater"
      poison = true
    }
    if (contNeg1 === 0 && contNeg2 === 0) {
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