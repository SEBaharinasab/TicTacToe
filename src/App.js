import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATION } from "./wining_combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
function deriveActivePlayer(turns) {
  let activePlayer =
    (turns.length > 0 && turns[0].player === "X")
      ? "O"
      : "X";
  return activePlayer;
}
function deriveWinner(gameBoard, players) {
  for (let combination of WINNING_COMBINATION) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol
      && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      return players[firstSquareSymbol];
    }
  }
  return null;
}
function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

/* --------------------------- Component Function --------------------------- */
function App() {
  /* --------------------------------- States --------------------------------- */
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2"
  });
  /* -------------------------------- Handlers -------------------------------- */
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevGameTurn => {
      let currentPlayer = deriveActivePlayer(prevGameTurn);
      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn
      ];
      return updatedGameTurn;
    });
  };
  const handleRematch = () => setGameTurns([]);
  const handleChangePlayerName = (symbol, newName) => {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      };
    });
  };
  /* --------------------------- Conditional Values --------------------------- */
  let activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  let endGame = !winner && gameTurns.length === 9;

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={"Player 1"}
              symbol={"X"}
              isActive={activePlayer === "X"}
              onChangeName={handleChangePlayerName}
            />
            <Player
              initialName={"Player 2"}
              symbol={"O"}
              isActive={activePlayer === "O"}
              onChangeName={handleChangePlayerName}
            />
          </ol>
          {(winner || endGame) && (<GameOver winner={winner} onRematch={handleRematch} />)}
          <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
