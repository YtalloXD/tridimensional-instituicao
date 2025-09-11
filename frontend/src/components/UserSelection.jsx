import React from "react";
import "./UserSelection.css"; // importa os estilos

export default function UserSelection({ onSelect }) {
  return (
    <div className="selection-container">
      <div className="user-box student" onClick={() => onSelect("Aluno")}>
        <div className="user-icon">📖</div>
        <div className="user-label">Aluno</div>
      </div>
      <div className="user-box teacher" onClick={() => onSelect("Professor")}>
        <div className="user-icon">🧑‍🏫</div>
        <div className="user-label">Professor</div>
      </div>
    </div>
  );
}
