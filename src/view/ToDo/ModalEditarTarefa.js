// ModalEditarTarefa.js
import React, { useState } from 'react';

function ModalEditarTarefa({ tarefa, fecharModal, atualizarTarefa }) {
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [horarioInicio, setHorarioInicio] = useState(tarefa.horario.split(' - ')[0]);
  const [horarioTermino, setHorarioTermino] = useState(tarefa.horario.split(' - ')[1]);
  const [corSelecionada, setCorSelecionada] = useState(tarefa.cor);

  const coresDisponiveis = ['#ff6347', '#ffa500', '#ffeb3b', '#4caf50', '#1e90ff'];

  const handleAtualizarTarefa = () => {
    atualizarTarefa({
      ...tarefa,
      titulo,
      horario: `${horarioInicio} - ${horarioTermino}`,
      cor: corSelecionada,
    });
    fecharModal();
  };

  return (
    <div className="modal">
      <div className="conteudo-modal">
        <h2 className="titulo-modal">Editar Tarefa</h2>

        <label className="label-modal">
          Título:
          <input
            type="text"
            className="input-modal"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        <label className="label-modal">
          Horário de Início:
          <input
            type="time"
            className="input-modal"
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />
        </label>

        <label className="label-modal">
          Horário de Término:
          <input
            type="time"
            className="input-modal"
            value={horarioTermino}
            onChange={(e) => setHorarioTermino(e.target.value)}
          />
        </label>

        <div className="cores-disponiveis">
          {coresDisponiveis.map((cor, index) => (
            <div
              key={index}
              className={`cor-opcao ${corSelecionada === cor ? 'selecionada' : ''}`}
              style={{ backgroundColor: cor }}
              onClick={() => setCorSelecionada(cor)}
            />
          ))}
        </div>

        <div className="botoes-modal">
          <button className="botao-modal-cancelar" onClick={fecharModal}>
            Cancelar
          </button>
          <button className="botao-modal-criar" onClick={handleAtualizarTarefa}>
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarTarefa;
