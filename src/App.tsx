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
    let newTiles = [...currentTiles]
    newTiles[index].flipped = !newTiles[index].flipped
    setCurrentTiles(newTiles)
  }

  return (
      <div className='tile-grid'>
      {currentTiles?.map((tile, i) => (
        <div 
          className='tile'
          key={i} 
          onClick={() => handleFlipTile(i)}>
          {tile.flipped ? tile.value : ''}
        </div>
      ))}
      </div>
  )
}

export default App
