import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const tiles = ['a', 'c', 'a', 'b', 'a', 'b', 'c', 'c', 'b']

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

    // Check for matched cards
    if(alreadyFlipped > -1 && alreadyFlipped !== index){
      if(newTiles[index].value === newTiles[alreadyFlipped].value){
        newTiles[index].matched = true
        newTiles[index].flipped = true
        newTiles[alreadyFlipped].matched = true
        setCurrentTiles(newTiles)
      }
      else{
        // Display mismatched tiles, wait 1 second before hiding them
        newTiles[index].error = true
        newTiles[index].flipped = true
        newTiles[alreadyFlipped].error = true
        setCurrentTiles(newTiles)
        setTimeout(() => {
          let newTiles = [...currentTiles]
          newTiles[index].error = false
          newTiles[index].flipped = false
          newTiles[alreadyFlipped].error = false
          newTiles[alreadyFlipped].flipped = false
          setCurrentTiles(newTiles)
        }, 1000);
      }
    }
    else{
      newTiles[index].flipped = !newTiles[index].flipped
      setCurrentTiles(newTiles)
    }

  }

  return (
      <>
      <button onClick={() => setCurrentTiles(makeGameTiles())}>Reset</button>
      <div className='tile-grid'>
      {currentTiles?.map((tile, i) => (
        <div 
          className={`tile ${tile.matched && 'tile-matched'} ${tile.error && 'tile-error'}`}
          key={i} 
          onClick={() => handleFlipTile(i)}>
          {tile.flipped ? tile.value : ''}
        </div>
      ))}
      </div>
      </>
  )
}

export default App
