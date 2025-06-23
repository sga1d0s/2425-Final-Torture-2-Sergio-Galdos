import Ingredient from "./Ingredient.mjs";
import Cauldron from "./Cauldron.mjs";

main()

async function main() {

  // leer DB
  const data = await getData()
  const ingredients = data.ingredients

  // crear array de ingredientes
  const ingredientsArray = createIncredients(ingredients)
  // console.log(ingredientsArray)

  // crear la factoría de cauldron
  const cauldron = new Cauldron(ingredientsArray)

  // crear las 6 pocines
  const potion1 = cauldron.createPotion("Bear Claws", "Bee")
  const potion2 = cauldron.createPotion("Chicken's Egg", "Chaurus Eggs")

  potion1.showInfo()

  // potion1.showInfo()
}

async function getData() {
  const url = "https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    return json
  } catch (error) {
    console.error(error.message);
  }
}

function createIncredients(data) {

  const ingredientsArray = []
  const ingredient = new Ingredient

  for (let i = 0; i < data.length; i++) {
    const ing = data[i];

    ingredientsArray.push(ingredient.create(ing))
  }

  return ingredientsArray
}