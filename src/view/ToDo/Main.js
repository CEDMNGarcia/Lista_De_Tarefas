import React, { useState, useEffect } from 'react';
import { LogoutButton } from "../Login/logout";
import ListaTarefas from './ListaTarefas';
import FormularioTarefa from './FormularioTarefa';
import ModalEditarTarefa from './ModalEditarTarefa';
import BarraPesquisa from './BarraPesquisa';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

function Main() {
  const [user] = useAuthState(auth);
  const [tarefas, setTarefas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [corFiltro, setCorFiltro] = useState('');

  useEffect(() => {
    const carregarTarefas = async () => {
      if (user) {
        try {
          const tarefasRef = doc(db, "tarefas", user.uid);
          const docSnap = await getDoc(tarefasRef);
          if (docSnap.exists()) {
            setTarefas(docSnap.data().listaTarefas || []);
          } else {
            // Documento não encontrado, cria um novo documento vazio
            await setDoc(tarefasRef, { listaTarefas: [] });
            setTarefas([]); // Inicializa o estado com uma lista vazia
          }
        } catch (error) {
          console.error("Erro ao carregar tarefas: ", error);
        }
      }
    };
    carregarTarefas();
  }, [user]);

  const adicionarTarefa = async (tarefa) => {
    try {
      const userId = user.uid;
      const novaTarefa = {
        ...tarefa,
        id: uuidv4(), // Gerar um ID único
        userId: userId,
        createdAt: new Date(),
      };

      // Adicionar tarefa ao Firestore
      const tarefasRef = doc(db, "tarefas", userId);
      const docSnap = await getDoc(tarefasRef);

      let tarefasList = [];
      if (docSnap.exists()) {
        tarefasList = docSnap.data().listaTarefas || [];
      }

      tarefasList.push(novaTarefa);

      // Salvar a lista de tarefas atualizada no Firestore
      await setDoc(tarefasRef, { listaTarefas: tarefasList });

      // Atualizar o estado local
      setTarefas(tarefasList);
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao salvar tarefa: ", error);
    }
  };

  const editarTarefa = (tarefa) => {
    setTarefaParaEditar(tarefa);
    setModalEditarAberto(true);
  };

  const atualizarTarefa = async (tarefaAtualizada) => {
    if (user) {
      try {
        const tarefasRef = doc(db, "tarefas", user.uid);
        const docSnap = await getDoc(tarefasRef);

        if (docSnap.exists()) {
          const tarefasList = docSnap.data().listaTarefas || [];
          const novasTarefas = tarefasList.map(tarefa =>
            tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
          );

          // Atualizar o Firestore
          await setDoc(tarefasRef, { listaTarefas: novasTarefas });

          // Atualizar o estado local
          setTarefas(novasTarefas);
        } else {
          console.error("Documento de tarefas não encontrado para o usuário:", user.uid);
        }
      } catch (error) {
        console.error("Erro ao atualizar tarefa: ", error);
      }
    } else {
      console.error("Usuário não autenticado.");
    }
  };

  const excluirTarefa = async (tarefaId) => {
    if (user) {
      try {
        // Verificar se tarefaId é uma string
        if (typeof tarefaId !== 'string') {
          console.error(`ID da tarefa deve ser uma string. Valor recebido: ${typeof tarefaId}`);
          return;
        }

        // Referência ao documento de tarefas do usuário
        const tarefasRef = doc(db, "tarefas", user.uid);
        const docSnap = await getDoc(tarefasRef);

        if (docSnap.exists()) {
          const tarefasList = docSnap.data().listaTarefas || [];

          // Verificar se a tarefa a ser excluída realmente existe na lista
          const novaListaTarefas = tarefasList.filter(tarefa => tarefa.id !== tarefaId);

          if (novaListaTarefas.length !== tarefasList.length) {
            // Atualizar o Firestore
            await setDoc(tarefasRef, { listaTarefas: novaListaTarefas });

            // Atualizar o estado local
            setTarefas(novaListaTarefas);

            console.log(`Tarefa com ID ${tarefaId} excluída com sucesso.`);
          } else {
            console.error(`Tarefa com ID ${tarefaId} não encontrada.`);
          }
        } else {
          console.error(`Documento de tarefas não encontrado para o usuário: ${user.uid}`);
        }
      } catch (error) {
        console.error("Erro ao excluir tarefa: ", error);
      }
    } else {
      console.error("Usuário não autenticado.");
    }
  };

  const filtrarTarefas = (termo, cor) => {
    setTermoPesquisa(termo);
    setCorFiltro(cor);
  };

  const tarefasFiltradas = tarefas.filter(tarefa =>
    (termoPesquisa === '' || tarefa.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())) &&
    (corFiltro === '' || tarefa.cor === corFiltro)
  );

  return (
    <div className="app justify-content">
      <div className='container-tarefas'>
        <div className="cabecalho">
          <BarraPesquisa onPesquisa={filtrarTarefas} />
          <LogoutButton />
        </div>
        <ListaTarefas
          tarefas={tarefasFiltradas}
          onEditar={editarTarefa}
          onExcluir={excluirTarefa}
        />
        {modalAberto && (
          <FormularioTarefa
            adicionarTarefa={adicionarTarefa}
            fecharModal={() => setModalAberto(false)}
          />
        )}
        {modalEditarAberto && tarefaParaEditar && (
          <ModalEditarTarefa
            tarefa={tarefaParaEditar}
            fecharModal={() => setModalEditarAberto(false)}
            atualizarTarefa={atualizarTarefa}
          />
        )}
        <div className="footer">
          <button onClick={() => setModalAberto(true)} className="modal-button">Nova Tarefa</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
