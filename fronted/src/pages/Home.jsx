function Home({ onStartGame }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-8 drop-shadow-2xl tracking-tight">
          MONOPOLY
        </h1>
        <h2 className="text-4xl font-bold text-yellow-300 mb-12 drop-shadow-lg">
          BRAIN
        </h2>
        <button
          onClick={onStartGame}
          className="bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-black text-2xl px-12 py-4 rounded-lg shadow-2xl transition-all duration-200 border-4 border-yellow-400"
        >
          START GAME
        </button>
      </div>
    </div>
  )
}

export default Home
