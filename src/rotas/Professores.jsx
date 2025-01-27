import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ListaProfessor from "../components/ListaProfessor.jsx";
import { useEffect, useState } from "react";

export default function professors() {
  const [professors, setprofessors] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/professor").then((res) => setprofessors(res.data));
  }, []);

  const [getprofessorId, setGetprofessorId] = useState({});
  const [busca, setBusca] = useState(false);
  const [professorId, setprofessorId] = useState("");

  const professorsRender = professors.map((professor) => (
    <ListaProfessor
      id={professor.id}
      nome={professor.nome}
      matricula={professor.matricula}
      telefone={professor.telefone}
      endereco={professor.endereco}
    />
  ));

  const buscar = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/professor/${professorId}`).then((res) => {
      setGetprofessorId(res.data);
      setBusca(true);
    });
  };

  const professorIdRender = (
    <div className="listaMapId">
      <button className="btn rota btnLista" onClick={() => setBusca(false)}>Lista de Professores</button>
      {getprofessorId.length == 0 ? <p className="pError">O número de id informado não existe!</p> : <ListaProfessor
        id={getprofessorId.id}
        nome={getprofessorId.nome}
        matricula={getprofessorId.matricula}
        telefone={getprofessorId.telefone}
        endereco={getprofessorId.endereco}
      />}
    </div>
  );

  return (
    <div>
      <div className="listagem">
        <h1>Professores</h1>
        <p className="pDescricao">O time de professores que fazem parte do nosso time:</p>
        <div>
          <button className="btn adicionar">
            <Link to="/cadastrodeprofessor">Adicionar professores</Link>
          </button>
          <form className="caixa-busca" action="" onSubmit={buscar}>
            <input
              className="caixa-pesquisa"
              type="text"
              name="busca"
              required
              placeholder="Digite o ID do professor..."
              value={professorId}
              onChange={(e) => setprofessorId(e.target.value)}
            />
            <input className="button-buscar " type="submit" value="Buscar" />
          </form>
        </div>
        <p className="listaMap">{busca ? professorIdRender : professorsRender}</p>
      </div>
    </div>
  );
}
