import './App.css'
import { useState } from 'react'

function Square({ value, onClick }) {
  return (
    <>
      <button className='square' onClick={onClick}>
        {value}
      </button>
    </>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  const handleSquareClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()
    let opt = xIsNext ? 'x' : 'o'
    nextSquares[i] = opt
    onPlay(nextSquares)
  }

  let status
  const winner = calculateWinner(squares)
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onClick={() => handleSquareClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onClick={() => handleSquareClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onClick={() => handleSquareClick(8)} />
      </div>
    </>
  )
}

function Game() {
  const [currentMove, setCurrentMove] = useState(0)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(pos) {
    setCurrentMove(pos)
  }

  const moves = history.map((squares, pos) => {
    let description
    if (pos > 0) {
      description = 'Go to pos #' + pos
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={pos}>
        <button onClick={() => jumpTo(pos)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return (
    <>
      <Game />
    </>
  )
}

export default App
