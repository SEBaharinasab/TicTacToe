

export default function GameBoard({ onSelectSquare, gameBoard }) {
   // /* --------------------------------- States --------------------------------- */
   // const [gameBoard, setGameBoard] = useState(initialGameBoard);

   // /* -------------------------------- Functions ------------------------------- */
   // const handleClickSquare = (rowIndex, colIndex) => {
   //    setGameBoard(prevGameBoard => {
   //       const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
   //       updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
   //       return updatedGameBoard;
   //    });
   //    onSelectSquare();
   // };
   return (
      <ol id="game-board">
         {gameBoard.map((row, rowIndex) => (<li key={rowIndex}>
            <ol> {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
               <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
               >{playerSymbol}</button>
            </li>))}</ol>
         </li>))}
      </ol>
   );
}
