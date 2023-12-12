import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Background, Container, Form } from '../SignIn/styles';
import { api } from '../../services/api';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    api.post('/users', { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      }).catch((error) => {
        if (error.response) {
          return alert(error.response.data.message);
        }
        alert("Erro ao cadastrar usuário!");
      });
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSignUp();
    }
  }

  return (
    <Container>
      <Background />

      <Form onKeyPress={handleKeyPress}>
        <h1>
          RocketMovies
        </h1>

        <p>
          Aplicação para acompanhar tudo que assistir.
        </p>

        <h2>
          Crie sua conta
        </h2>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          type="text"
          icon={FiUser}
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="text"
          icon={FiMail}
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          icon={FiLock}
        />

        <Button 
          title="Cadastrar" 
          onClick={() => handleSignUp()}
        />

        <Link to="/">
          Já tenho uma conta
        </Link>
      </Form>
    </Container>
  )
}