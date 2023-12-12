import { useNavigate } from 'react-router-dom';

import { Input } from '../Input';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { Container, Profile } from './styles';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

export function Header({ onInputChange }) {

  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  const avatarFilePath = `${api.defaults.baseURL}/files/${user.avatar}`;
  const avatar = user.avatar ? avatarFilePath : avatarPlaceholder;

  function handleSignOut() {
    signOut();
  }

  return (
    <Container>
      <h1>RocketMovies</h1>

      <Input 
        placeholder="Pesquisar pelo título"
        onChange={e => onInputChange(e.target.value)}
      />

      <Profile>
        <div>
          <strong onClick={() => navigate("/profile")}>{user.name}</strong>
          <span onClick={handleSignOut}>Sair</span>
        </div>

        <img onClick={() => navigate("/profile")} src={avatar} alt={user.name} />
      </Profile>
    </Container>
  )
}