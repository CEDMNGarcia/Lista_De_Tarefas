import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import { auth } from "../../services/firebaseConfig";
import "../../css/App.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container login">
      <header className="header">
        <span>Realize login para ter acesso as suas tarefas</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p>Você não tem uma conta?</p>
        <a href="/register">Crie a sua conta aqui</a>

        <button className="button" onClick={handleSignIn}>
          Entrar
        </button>
      </form>
    </div>
  );
}
