import { useState } from 'react'

function SplitPayment({ players, onClose, updatePlayerBalance }) {
  const [selectedFromPlayers, setSelectedFromPlayers] = useState([])
  const [toPlayer, setToPlayer] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [currencySelected, setCurrencySelected] = useState(false)
  const [showCurrencyError, setShowCurrencyError] = useState(false)

  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      return `$ ${(balance / 1000000).toFixed(2)} Million`
    } else if (balance >= 1000) {
      return `$ ${(balance / 1000).toFixed(2)} K`
    }
    return `$ ${balance}`
  }

  const handleSplitPayment = (e) => {
    e.preventDefault()
    const amount = Number(totalAmount)
    const to = players.find(p => p.id === parseInt(toPlayer))

    if (!currencySelected) {
      setShowCurrencyError(true)
      return
    }

    if (selectedFromPlayers.length === 0 || !to || amount <= 0 || isNaN(amount)) {
      return
    }

    const amountPerPlayer = amount / selectedFromPlayers.length

    // Check if all players have enough balance
    const allCanPay = selectedFromPlayers.every(playerId => {
      const player = players.find(p => p.id === playerId)
      return player && player.balance >= amountPerPlayer
    })

    if (!allCanPay) {
      alert('One or more players do not have enough balance!')
      return
    }

    // Deduct from all selected players
    selectedFromPlayers.forEach(playerId => {
      const player = players.find(p => p.id === playerId)
      if (player) {
        updatePlayerBalance(player.id, player.balance - amountPerPlayer)
      }
    })

    // Add to recipient
    updatePlayerBalance(to.id, to.balance + amount)
    onClose()
  }

  const togglePlayerSelection = (playerId) => {
    if (selectedFromPlayers.includes(playerId)) {
      setSelectedFromPlayers(selectedFromPlayers.filter(id => id !== playerId))
    } else {
      setSelectedFromPlayers([...selectedFromPlayers, playerId])
    }
  }

  const handleToPlayerChange = (selectedToPlayerId) => {
    setToPlayer(selectedToPlayerId)
    // Auto-select all other players in From section
    if (selectedToPlayerId) {
      const otherPlayerIds = players
        .filter(p => p.id !== parseInt(selectedToPlayerId))
        .map(p => p.id)
      setSelectedFromPlayers(otherPlayerIds)
    } else {
      setSelectedFromPlayers([])
    }
  }

  const multiplyAmount = (multiplier) => {
    const currentAmount = parseFloat(totalAmount) || 0
    setTotalAmount((currentAmount * multiplier).toString())
    setCurrencySelected(true)
    setShowCurrencyError(false)
  }

  const amountPerPlayer = selectedFromPlayers.length > 0 
    ? (Number(totalAmount) / selectedFromPlayers.length).toFixed(2) 
    : '0'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-6 shadow-2xl border-4 border-yellow-500/30 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-300">Split Payment</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSplitPayment} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">To Player</label>
            <select
              value={toPlayer}
              onChange={(e) => handleToPlayerChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border-2 border-yellow-500/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              required
            >
              <option value="">Select player</option>
              {players.map(player => (
                <option key={player.id} value={player.id} className="text-black">
                  {player.name} ({formatBalance(player.balance)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2">From Players (Select Multiple)</label>
            <div className="space-y-2 max-h-48 overflow-y-auto bg-white/5 rounded-lg p-2">
              {players
                .filter(p => p.id !== parseInt(toPlayer))
                .map(player => (
                  <label
                    key={player.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedFromPlayers.includes(player.id)
                        ? 'bg-blue-500/30 border-2 border-blue-400'
                        : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFromPlayers.includes(player.id)}
                      onChange={() => togglePlayerSelection(player.id)}
                      className="mr-3 w-5 h-5"
                    />
                    <span className="text-white">
                      {player.name} ({formatBalance(player.balance)})
                    </span>
                  </label>
                ))}
            </div>
            {selectedFromPlayers.length > 0 && (
              <p className="text-teal-300 text-sm mt-2">
                {selectedFromPlayers.length} player(s) selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/80 mb-2">Total Amount</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border-2 border-yellow-500/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
              placeholder="Enter total amount"
              required
            />
            {selectedFromPlayers.length > 0 && totalAmount && (
              <p className="text-white/70 text-sm mt-2">
                Each player pays: {formatBalance(amountPerPlayer)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/80 mb-2">Currency</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => multiplyAmount(1000)}
                className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 py-2 rounded-lg font-bold"
              >
                Thousand
              </button>
              <button
                type="button"
                onClick={() => multiplyAmount(1000000)}
                className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 py-2 rounded-lg font-bold"
              >
                Million
              </button>
            </div>
            {showCurrencyError && (
              <p className="text-red-400 text-sm mt-1">
                Select currency
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
          >
            SPLIT PAYMENT
          </button>
        </form>
      </div>
    </div>
  )
}

export default SplitPayment
