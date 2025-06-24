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
  const potion3 = cauldron.createPotion("Chaurus Eggs", "Bleeding Crown")
  const potion4 = cauldron.createPotion("Nightshade", "Ectoplasm")
  const potion5 = cauldron.createPotion("Wheat", "Blue Mountain Flower")
  const potion6 = cauldron.createPotion("Hanging Moss", "Human Heart")

  potion1.showInfo()
  potion2.showInfo()
  potion3.showInfo()
  potion4.showInfo()
  potion5.showInfo()
  potion6.showInfo()
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

  for (let i = 0; i < data.length; i++) {
    const ing = data[i];

    ingredientsArray.push(Ingredient.create(ing))
  }

  return ingredientsArray
}