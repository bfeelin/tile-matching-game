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
      matched: false
    }
  })
}

function App() {
  const [currentTiles, setCurrentTiles] = useState(makeGameTiles())

  const handleFlipTile = (index:number) => {
    let alreadyFlipped = currentTiles.findIndex((tile) => tile.flipped && !tile.matched)
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

      }
    }
    else{
      newTiles[index].flipped = !newTiles[index].flipped
      setCurrentTiles(newTiles)
    }

  }

  return (
      <div className='tile-grid'>
      {currentTiles?.map((tile, i) => (
        <div 
          className={`tile ${tile.matched && 'tile-matched'}`}
          key={i} 
          onClick={() => handleFlipTile(i)}>
          {tile.flipped ? tile.value : ''}
        </div>
      ))}
      </div>
  )
}

export default App
