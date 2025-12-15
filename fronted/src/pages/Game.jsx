import { useState } from 'react'
import CreditCard from '../components/CreditCard'
import Transfer from '../utils/Transfer'
import BankPay from '../utils/BankPay'
import BankCollect from '../utils/BankCollect'
import SplitPayment from '../utils/SplitPayment'

function Game({ players, setPlayers, onPlayersSetup }) {
  const [activeModal, setActiveModal] = useState(null) // 'transfer' | 'bankPay' | 'bankCollect' | 'splitPayment' | null
  const [step, setStep] = useState('playerCount') // 'playerCount' | 'playerNames'
  const [playerCount, setPlayerCount] = useState(0)
  const [playerNames, setPlayerNames] = useState([])
  const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [currentName, setCurrentName] = useState('')

  const handlePlayerCountSubmit = (e) => {
    e.preventDefault()
    const count = parseInt(playerCount)
    if (count >= 2 && count <= 8) {
      setStep('playerNames')
      setPlayerNames(new Array(count).fill(''))
    }
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (currentName.trim()) {
      const newNames = [...playerNames]
      newNames[currentNameIndex] = currentName.trim()
      setPlayerNames(newNames)
      
      if (currentNameIndex < playerCount - 1) {
        setCurrentNameIndex(currentNameIndex + 1)
        setCurrentName('')
      } else {
        // All names collected, create players
        const playerList = newNames.map((name, index) => ({
          id: index,
          name: name,
          balance: 15000000,
          cardNumber: generateCardNumber(),
          color: getPlayerColor(index)
        }))
        onPlayersSetup(playerList)
      }
    }
  }

  const generateCardNumber = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('')
  }

  const getPlayerColor = (index) => {
    const colors = [
      'from-red-500 to-red-700',
      'from-blue-500 to-blue-700',
      'from-yellow-500 to-yellow-700',
      'from-purple-500 to-purple-700',
      'from-pink-500 to-pink-700',
      'from-orange-500 to-orange-700',
      'from-teal-500 to-teal-700',
      'from-indigo-500 to-indigo-700'
    ]
    return colors[index % colors.length]
  }

  const updatePlayerBalance = (playerId, newBalance) => {
    setPlayers(prevPlayers => prevPlayers.map(player => 
      player.id === playerId ? { ...player, balance: newBalance } : player
    ))
  }

  return (
    <div className="min-h-screen pb-32">
      
      <div className={players.length === 0 ? 'filter blur-[2px]' : ''}>
        
        <div className="text-center mb-8 pt-4 px-4">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">
            MONOPOLY BRAIN
          </h1>
          <p className="text-yellow-300/80 mt-2">Track Your Money</p>
        </div>

        
        {players.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-300 text-center mb-4 px-4">Player Cards</h2>
            <div className="w-[95vw] mx-auto overflow-x-auto overflow-y-hidden hide-scrollbar">
              <div className="flex gap-4">
                {players.map(player => (
                  <div key={player.id} className="flex-shrink-0 w-[450px]">
                    <CreditCard player={player} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        
        {players.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-emerald-950 via-emerald-900 to-transparent p-4 pb-6">
              <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveModal('bankPay')}
                  className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-green-400"
                >
                  <div className="text-2xl mb-1">🏦</div>
                  <div>Bank Pay</div>
                </button>
                
                <button
                  onClick={() => setActiveModal('bankCollect')}
                  className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-red-400"
                >
                  <div className="text-2xl mb-1">💰</div>
                  <div>Bank Collect</div>
                </button>
                
                <button
                  onClick={() => setActiveModal('transfer')}
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-blue-400"
                >
                  <div className="text-2xl mb-1">💸</div>
                  <div>Transfer</div>
                </button>
                
                <button
                  onClick={() => setActiveModal('splitPayment')}
                  className="bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-teal-400"
                >
                  <div className="text-2xl mb-1">👥</div>
                  <div>Split Pay</div>
                </button>
              </div>
            </div>
          )}
      </div>

      {players.length === 0 && step === 'playerCount' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-4 border-yellow-500/30 max-w-md w-full">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
              How many players?
            </h2>
            <form onSubmit={handlePlayerCountSubmit}>
              <input
                type="number"
                min="2"
                max="8"
                value={playerCount || ''}
                onChange={(e) => setPlayerCount(e.target.value)}
                className="w-full px-6 py-4 text-2xl text-center bg-white/20 border-4 border-yellow-500/50 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 mb-6"
                placeholder="2-8"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl px-6 py-4 rounded-xl shadow-lg transition-all duration-200"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      )}

      {players.length === 0 && step === 'playerNames' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-4 border-yellow-500/30 max-w-md w-full">
            <h2 className="text-3xl font-bold text-yellow-300 mb-2 text-center">
              Player {currentNameIndex + 1}
            </h2>
            <p className="text-white/70 text-center mb-6">
              {currentNameIndex + 1} of {playerCount}
            </p>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                className="w-full px-6 py-4 text-xl text-center bg-white/20 border-4 border-yellow-500/50 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 mb-6"
                placeholder="Enter name"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl px-6 py-4 rounded-xl shadow-lg transition-all duration-200"
              >
                {currentNameIndex < playerCount - 1 ? 'NEXT' : 'START GAME'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {activeModal === 'splitPayment' && (
        <SplitPayment 
          players={players} 
          onClose={() => setActiveModal(null)}
          updatePlayerBalance={updatePlayerBalance}
        />
      )}

      {activeModal === 'transfer' && (
        <Transfer 
          players={players} 
          onClose={() => setActiveModal(null)}
          updatePlayerBalance={updatePlayerBalance}
        />
      )}
      
      {activeModal === 'bankPay' && (
        <BankPay 
          players={players} 
          onClose={() => setActiveModal(null)}
          updatePlayerBalance={updatePlayerBalance}
        />
      )}
      
      {activeModal === 'bankCollect' && (
        <BankCollect 
          players={players} 
          onClose={() => setActiveModal(null)}
          updatePlayerBalance={updatePlayerBalance}
        />
      )}
    </div>
  )
}

export default Game
