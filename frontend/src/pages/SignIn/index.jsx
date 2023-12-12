import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Background, Container, Form } from './styles';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    if (!email || !password) {
      return alert('Preencha todos os campos.');
    }
    signIn({ email, password });
  }

  return (
    <Container>
      <Form>
        <h1>
          RocketMovies
        </h1>

        <p>
          Aplicação para acompanhar tudo que assistir.
        </p>

        <h2>
          Faça seu Login
        </h2>

        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          type="text"
          icon={FiMail}
        />

        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          icon={FiLock}
        />

        <Button 
          title="Entrar"
          onClick={() => handleSignIn()}
        />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <Background />
    </Container>
  )
}