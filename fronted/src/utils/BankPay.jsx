import { useState } from 'react'

function BankPay({ players, onClose, updatePlayerBalance }) {
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [amount, setAmount] = useState('')
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

  const handleBankPay = (e) => {
    e.preventDefault()
    
    if (!currencySelected) {
      setShowCurrencyError(true)
      return
    }
    
    const payAmount = Number(amount)
    const player = players.find(p => p.id === parseInt(selectedPlayer))

    if (player && payAmount > 0 && !isNaN(payAmount)) {
      updatePlayerBalance(player.id, player.balance + payAmount)
      onClose()
    }
  }

  const multiplyAmount = (multiplier) => {
    const currentAmount = parseFloat(amount) || 0
    setAmount((currentAmount * multiplier).toString())
    setCurrencySelected(true)
    setShowCurrencyError(false)
  }

  const quickActions = [
    { label: 'Pass GO', amount: "2 Million" },
    { label: 'Bank Error', amount: "200 K" },
    { label: 'Second in Beauty', amount: "10 K" },
    { label: 'Tax Refund', amount: "20 K" }
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-linear-to-br from-emerald-800 to-emerald-900 rounded-2xl p-6 shadow-2xl border-4 border-yellow-500/30 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-300">Bank Pays Player</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleBankPay} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Select Player</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border-2 border-yellow-500/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              required
            >
              <option value="">Choose player</option>
              {players.map(player => (
                <option key={player.id} value={player.id} className="text-black">
                  {player.name} ({formatBalance(player.balance)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border-2 border-yellow-500/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Currency</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => multiplyAmount(1000)}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 py-2 rounded-lg font-bold"
              >
                Thousand
              </button>
              <button
                type="button"
                onClick={() => multiplyAmount(1000000)}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 py-2 rounded-lg font-bold"
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

          <div>
            <label className="block text-white/80 mb-2">Quick Actions</label>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setAmount(action.amount.toString())}
                  className="bg-green-600/50 hover:bg-green-600/70 text-white py-2 px-3 rounded-lg text-sm"
                >
                  {action.label}
                  <div className="text-yellow-300 font-bold">${action.amount}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
          >
            PAY PLAYER
          </button>
        </form>
      </div>
    </div>
  )
}

export default BankPay
