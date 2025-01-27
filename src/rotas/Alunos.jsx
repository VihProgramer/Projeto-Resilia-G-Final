import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ListaAlunos from "../components/ListaAluno";
import { useEffect, useState } from "react";

export default function alunos() {
  const [alunos, setalunos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/aluno").then((res) => setalunos(res.data));
  }, []);

  const [getalunoId, setGetalunoId] = useState({});
  const [busca, setBusca] = useState(false);
  const [alunoId, setalunoId] = useState("");

  const alunosRender = alunos.map((aluno) => (
    <ListaAlunos
      id={aluno.id}
      nome={aluno.nome}
      turma={aluno.turma}
      media={aluno.media}
      telefone={aluno.telefone}
    />
  ));

  const buscar = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/aluno/${alunoId}`).then((res) => {
      setGetalunoId(res.data);
      setBusca(true);
    });
  };

  const alunoIdRender = (
    <div className="listaMapId">
      <button className="btn rota btnLista" onClick={() => setBusca(false)}>Lista de Alunos</button>
      {getalunoId.length == 0 ? <p className="pError">O número de id informado não existe!</p> : <ListaAlunos
        id={getalunoId.id}
        nome={getalunoId.nome}
        turma={getalunoId.turma}
        media={getalunoId.media}
        telefone={getalunoId.telefone}
      />}
    </div>
  );

  return (
    <div>
      <div className="listagem">
        <h1>Alunos</h1>
        <p className="pDescricao">Alunos matriculados em nossa instituição:</p>
        <div>
          <button className="btn adicionar">
            <Link to="/cadastrodealuno">Adicionar aluno</Link>
          </button>
          <form className="caixa-busca" action="" onSubmit={buscar}>
            <input
              className="caixa-pesquisa"
              type="text"
              name="busca"
              required
              placeholder="Digite o ID do aluno..."
              value={alunoId}
              onChange={(e) => setalunoId(e.target.value)}
            />
            <input className="button-buscar " type="submit" value="Buscar" />
          </form>
        </div>
        <p className="listaMap">{busca ? alunoIdRender : alunosRender}</p>
      </div>
    </div>
  );
}
