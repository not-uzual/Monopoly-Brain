function CreditCard({ player }) {
  const formatCardNumber = (number) => {
    return number.match(/.{1,4}/g).join(' ')
  }

  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      return `$ ${(balance / 1000000).toFixed(2)} Million`
    } else if (balance >= 1000) {
      return `$ ${(balance / 1000).toFixed(2)} K`
    }
    return `$ ${balance}`
  }

  return (
    <div className={`bg-linear-to-br ${player.color} rounded-xl p-6 shadow-2xl transition-all duration-200 border-4 border-white/20`}>
      <div className="flex justify-between items-start mb-6">
        <div className="text-white/80 text-sm font-bold">MONOPOLY BANK</div>
        <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
          <div className="bg-yellow-400 rounded-full w-8 h-8"></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-white/70 text-xs mb-1">Card Number</div>
        <div className="text-white font-mono text-lg tracking-wider">
          {formatCardNumber(player.cardNumber)}
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <div className="text-white/70 text-xs mb-1">Card Holder</div>
          <div className="text-white font-bold text-xl">{player.name}</div>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-xs mb-1">Balance</div>
          <div className="text-yellow-300 font-black text-2xl">
            {formatBalance(player.balance)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCard
