import React, { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
   /* --------------------------------- States --------------------------------- */
   const [isEditing, setIsEditing] = useState(false);
   const [playerName, setPlayerName] = useState(initialName);
   /* -------------------------------- Functions ------------------------------- */
   const handleEditClick = () => {
      setIsEditing(editing => !editing);
      isEditing && onChangeName(symbol, playerName);
   };
   const handleChangePlayerName = (event) => {
      setPlayerName(event.target.value);
   };

   /* --------------------------- Conditional Values --------------------------- */
   const editablePlayerName = (isEditing ? (
      <input type="text" value={playerName} onChange={handleChangePlayerName} />
   ) : (
      <span className="player-name">{playerName}</span>
   ));
   const editBtnCaption = isEditing ? ("Save") : ("Edit");

   return (
      <li className={isActive ? "active" : undefined}>
         <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
         </span>
         <button onClick={handleEditClick}>{editBtnCaption}</button>
      </li>
   );
}
