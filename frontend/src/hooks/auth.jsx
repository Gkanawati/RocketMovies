import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({});

function AuthProvider({children}) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { user, token} = response.data;

      localStorage.setItem('@RocketMovies:user', JSON.stringify(user));
      localStorage.setItem('@RocketMovies:token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ user, token });
    }
    catch (error) {
      if (error.response) {
        return alert(error.response.data.message);
      }
      alert('Erro ao realizar login, tente novamente mais tarde.');
  }
  }

  async function signOut() {
    localStorage.removeItem('@RocketMovies:user');
    localStorage.removeItem('@RocketMovies:token');
    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append('avatar', avatarFile);

        const response = await api.patch('/users/avatar', fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put('/users', user);
      localStorage.setItem('@RocketMovies:user', JSON.stringify(user));

      setData({ user, token: data.token });

      alert('Perfil atualizado com sucesso!');

      return true;
    }
    catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Erro ao atualizar perfil, tente novamente mais tarde.');
      }
      return false;
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('@RocketMovies:user');
    const token = localStorage.getItem('@RocketMovies:token');

    if (user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return (
      <AuthContext.Provider value={{ 
          signIn,
          signOut,
          updateProfile,
          user: data.user,
        }}>
        {children}
      </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {
  useAuth,
  AuthProvider
}