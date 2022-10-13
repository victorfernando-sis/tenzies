import logo from './logo.svg';
import './App.css';
import Die from './components/Die'
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)



  React.useEffect(() => {

    setTenzies(dice.every((item, i, arr) => (
      item.isHeld && (item.value === arr[0].value))
    ))

  }, [dice])

  function allNewDice(count = 10) {
    const diceArray = []
    for (let i = 0; i < count; i++) {

      diceArray.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return diceArray
  }


  function rollDice() {
    const newArray = allNewDice()
    if (tenzies) {
      setDice(newArray)
    } else {
      setDice(prevState => (
        prevState.map((item, index) => (!item.isHeld) ?
          newArray[index] :
          item)
      ))
    }

  }


  function holdDice(id) {
    setDice(prevState => prevState.map(item => {
      return (item.id === id) ? { ...item, isHeld: !item.isHeld } : item
    }))
  }
  const diceElements = dice.map(item => (

    <Die
      key={item.id}
      isHeld={item.isHeld}
      value={item.value}
      holdDice={() => holdDice(item.id)} />))


  return (
    <main className="App">
      {tenzies && <Confetti className='confetti' />}
      <h1 className="title">Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='grid-container'>
        {diceElements}
      </div>
      {(!tenzies) ?
        <button
          className="roll-dice"
          onClick={rollDice}>Roll</button> :
        <button
          className="new-game"
          onClick={rollDice}>New Game!</button>}


    </main>
  );
}

export default App;
