import ArrantPrack from "./ArrantPrack.mjs"
import Elixir from "./Elixir.mjs"
import Poison from "./Poison.mjs"
import Sanity from "./Sanity.mjs"

export default class Cauldron {
  constructor(ingredients) {
    this.ingredients = ingredients
  }

  createPotion(name1, name2) {

    let potion = null
    let mod = null
    let effectName = null
     
    let weight = null
    let value = null
    let time = null

    let ingredient1 = null
    let ingredient2 = null

    const positiveEffects = ["Fortifity", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"]
    const negativeEffects = "Weakness Damage Ravage Frenzy Fear Paralisis Slow"

    let contPos1 = 0
    let contPos2 = 0
    let contNeg = 0

    let isElixir = false
    let isLeeser = false
    let isGreater = false

    // extraer información de cada ingrediente
    for (let i = 0; i < this.ingredients.length; i++) {
      const ing = this.ingredients[i];

      if (ing.name === name1) {
        ingredient1 = ing
      }

      if (ing.name === name2) {
        ingredient2 = ing
      }
    }

    //contar efectos positivos ing 1
    for (let i = 0; i < ingredient1.effects.length; i++) {
      const effect = ingredient1.effects[i];
      for (let j = 0; j < positiveEffects.length; j++) {
        const positiveEfect = positiveEffects[j];

        if (effect.includes(positiveEfect)) {
          contPos1++
        }
      }
    }

    // contar efectos positivos ing2
    for (let i = 0; i < ingredient2.effects.length; i++) {
      const effect = ingredient2.effects[i];

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
        value = ingredient1.value + ingredient2.value
      } else {
        mod = "Greater"
        value = ingredient1.value + ingredient2.value * 3
      }
    }

    let nameElixir = `${mod} elixir of ${effectName}`
    let namePoison = `${mod} elixir of ${effectName}`

    if (isElixir) {
      potion = new Elixir(nameElixir, value, weight = 10 , time = "time")
    }

    // console.log(isLeeser)
    // console.log(isGreater)
    // console.log(isElixir)

    // crear una de las 4 pociones disponibles

    // devolver la pocion creada
    return potion
  }
}