import { Children, useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  }
  );
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };


  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
    //checkear si hay ganador o empate
  };

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
        <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
