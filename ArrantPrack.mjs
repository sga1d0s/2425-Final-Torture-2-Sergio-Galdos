import Potion from "./Potion.mjs";

export default class ArrantPrack extends Potion {
  constructor(name, value, weight, time){
    super(name, value, weight)

    this.time = time
  }

  showInfo(){
    //
    console.log("")
    console.log(this.name)
    console.log(`Value: \t\t${this.value}`)
    console.log(`Weight: \t${this.weight}`)
    if (this.time) {
      console.log(`Time: \t\t${this.time}`)
    }
    console.log("------------------------")
  }

}