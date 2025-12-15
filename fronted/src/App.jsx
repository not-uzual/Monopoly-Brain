
import { useState } from 'react'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [players, setPlayers] = useState([])

  const handleStartGame = () => {
    setShowWelcome(false)
  }

  const handlePlayersSetup = (playerList) => {
    setPlayers(playerList)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900">
      {showWelcome ? (
        <Home onStartGame={handleStartGame} />
      ) : (
        <Game players={players} setPlayers={setPlayers} onPlayersSetup={handlePlayersSetup} />
      )}
    </div>
  )
}

export default App
