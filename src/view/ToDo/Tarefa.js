// Tarefa.js
import React, { useState } from 'react';

function Tarefa({ tarefa, onEditar, onExcluir }) {

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div>
      <div
        className="ponta-colorida"
        style={{ backgroundColor: tarefa.cor }}
      ></div>
      <div className="tarefa" style={{ borderColor: tarefa.cor }}>


        <div className="conteudo-tarefa">
          <div className="titulo-tarefa">{tarefa.titulo}</div>
          <div className="horario-tarefa">{tarefa.horario}</div>
        </div>
        <div className="menu-container">
          <button className="kebab-menu" onClick={toggleMenu}>⋮</button>
          {menuAberto && (
            <div className="menu-opcoes">
              <button onClick={() => onEditar(tarefa)}>Editar</button>
              <button onClick={() => onExcluir(tarefa)}>Excluir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tarefa;
