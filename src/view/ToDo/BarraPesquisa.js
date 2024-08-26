// BarraPesquisa.js
import React, { useState } from 'react';

function BarraPesquisa({ onPesquisa }) {
  const [termo, setTermo] = useState('');
  const [corSelecionada, setCorSelecionada] = useState('');

  const coresDisponiveis = ['#ff6347', '#ffa500', '#ffeb3b', '#4caf50', '#1e90ff'];

  const handleTermoChange = (e) => {
    setTermo(e.target.value);
    onPesquisa(e.target.value, corSelecionada);
  };

  const handleCorClick = (cor) => {
    setCorSelecionada(cor);
    onPesquisa(termo, cor);
  };

  return (
    <div className="barra-pesquisa">
      <input
        type="text"
        placeholder="Pesquisar tarefas..."
        value={termo}
        onChange={handleTermoChange}
      />
      <div className="filtros-cores">
        {coresDisponiveis.map((cor, index) => (
          <div
            key={index}
            className={`cor-opcao ${corSelecionada === cor ? 'selecionada' : ''}`}
            style={{ backgroundColor: cor }}
            onClick={() => handleCorClick(cor)}
          />
        ))}
        <div
          className={`cor-opcao ${corSelecionada === '' ? 'selecionada' : ''}`}
          style={{ backgroundColor: 'transparent', border: '2px solid #fff' }}
          onClick={() => handleCorClick('')}
        />
      </div>
    </div>
  );
}

export default BarraPesquisa;
