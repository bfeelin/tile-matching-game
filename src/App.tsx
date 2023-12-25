import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const tiles = ['a', 'c', 'a', 'b', 'a', 'b', 'c', 'c', 'c', 'a', 'b', 'b']

const makeGameTiles = () => {
  return tiles.map((tile) => {
    return {
      value: tile,
      flipped: false,
      matched: false,
      error: false
    }
  })
}

function App() {
  const [currentTiles, setCurrentTiles] = useState(makeGameTiles())

  const handleFlipTile = (index:number) => {
    let alreadyFlipped = currentTiles.findIndex((tile) => tile.flipped && !tile.matched && !tile.error)
    let newTiles = [...currentTiles]

    // Check for already flipped card
    if(alreadyFlipped > -1 && alreadyFlipped !== index){
      // Check for successful match
      if(newTiles[index].value === newTiles[alreadyFlipped].value){
        newTiles[index].matched = true
        newTiles[index].flipped = true
        newTiles[alreadyFlipped].matched = true
        setCurrentTiles(newTiles)
      }
      else{
        // Display mismatched tiles, wait 1 second before hiding them
        setCurrentTiles(makeErrorTiles(true, index, alreadyFlipped))
        setTimeout(() => {
          setCurrentTiles(makeErrorTiles(false, index, alreadyFlipped))
        }, 1000);
      }
    }
    else{
      newTiles[index].flipped = !newTiles[index].flipped
      setCurrentTiles(newTiles)
    }
  }

  function makeErrorTiles(value:boolean, index1:number, index2:number){
    let newTiles = [...currentTiles]
    newTiles[index1].error = value
    newTiles[index1].flipped = value
    newTiles[index2].error = value
    newTiles[index2].flipped = value
    return newTiles
  }

  return (
      <>
      <button onClick={() => setCurrentTiles(makeGameTiles())}>Reset</button>
      <div className='tile-grid'>
      {currentTiles?.map((tile, i) => (
        <div 
          className={`tile ${tile.matched && 'tile-matched'} ${tile.error && 'tile-error'}`}
          key={i} 
          onClick={() => !tile.error && !tile.matched && handleFlipTile(i)}>
          {tile.flipped ? tile.value : ''}
        </div>
      ))}
      </div>
      </>
  )
}

export default App
