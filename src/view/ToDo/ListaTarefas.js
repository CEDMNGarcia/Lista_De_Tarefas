import React from 'react';
import Tarefa from './Tarefa';

function ListaTarefas({ tarefas, onEditar, onExcluir }) {
  return (
    <div className="lista-tarefas">
      {tarefas.length === 0 ? (
        <div className="mensagem-nem-tarefas">Nenhuma tarefa disponível</div>
      ) : (
        tarefas.map((tarefa, index) => (
          <div key={index} className="tarefa">
            <div className="cor-tarefa" style={{ backgroundColor: tarefa.cor }} />
            <div className="conteudo-tarefa">
              <Tarefa
                key={index}
                tarefa={tarefa}
                onEditar={() => onEditar(tarefa)}
                onExcluir={() => onExcluir(tarefa.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaTarefas;
