import React from "react"
import Die from "./Die.js"
import {nanoid} from "nanoid"


export default function App(){

  function generateDice(){
    return{
      value: Math.floor(Math.random()*6 +1),
      isHeld: false,
      id: nanoid()
    }
  }
  // this function creates an array of 10 numbers ranging from 1 to 6

  function allNewDice(){
    let newDice=[]
    for (let i=0; i<10; i++){

                newDice.push(generateDice())
    }
    return(newDice)
    
}


// setting the new made array into state

let [newDice, setNewDice]=React.useState(allNewDice())

// making tenzies state to check if all dices are same and if user won

let [tenzies, setTenzies]=React.useState(false)

// initailising a counter
let[counter, setCounter]=React.useState(0)

React.useEffect(()=>{
  // if all dices have isHeld true and values are same, let user know they won the game
  let allHeld= newDice.every(x=> x.isHeld)
  let benchmark= newDice[0].value;
  let allSame= newDice.every((x)=>x.value===benchmark)

  if (allSame && allHeld){
    setTenzies(true)
    console.log("you won")
  }
}, [newDice])

// function to console each button id and then changing the state of isHeld if the button is clicked
function holdDice(id){
  setNewDice(prev=> prev.map(item=>{
    return item.id===id ?
    {...item, isHeld: !item.isHeld} : 
    item
  }))
}

// mapping over the array and setting it to the dice array value

// also, creating an object to store the id of different buttons

let diceElements= newDice.map(item => <Die 
  id={item.id}
  value={item.value}
  isHeld={item.isHeld}
  holdDice={() => holdDice(item.id)} 
   />
  )

// updating the dices on the click of the button
// also updating the dices whose isHelp attribute is false

function roll(){
  if (!tenzies){
    setCounter(prev=> prev+1)
    setNewDice(prev=> prev.map(item=>{
      return item.isHeld? item : generateDice()
    }))
  }
  else{
    setTenzies(false)
    setNewDice(allNewDice())
    setCounter(0)
  }
}



  return(
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice--container">
        {diceElements}
      </div>
    <button className="roll--dice" onClick={roll}>{tenzies ? "New Game": "Roll Dice"} </button>
    <h2>Counter: {counter}</h2>
    </main>
  )
}