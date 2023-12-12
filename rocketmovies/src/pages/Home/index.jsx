import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { Note } from '../../components/Note';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';

import { api } from '../../services/api';

import { Container, Content, ContentHeader, EmptyContent } from './styles';

export function Home() {
  const tags = [];
  const [movieNotes, setMovieNotes] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSearchTitleChange = (value) => {
    setSearchTitle(value);
  };

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  async function fetchMovieNotes() {
    setLoading(true);
    try {
      const order = 'desc';
      const response = await api.get(`/movie_notes?title=${searchTitle}&tags=${tags}&order=${order}`)
      setMovieNotes(response.data.reverse());
      setLoading(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Não foi possível carregar as notas no momento.');
      }
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovieNotes();
  }, [searchTitle]);

  return (
    <Container>
      <Header onInputChange={handleSearchTitleChange} />

      <Content>
        <ContentHeader>
          <h1>Meus Filmes</h1>

          <Link to='/new'>
            <Button icon={FiPlus} title="Adicionar Filme" />
          </Link>
        </ContentHeader>

        <Section title="Minhas notas">
          {
            movieNotes.map(note => (
              <div key={note.id} onClick={() => handleDetails(note.id)}>
                  <Note data={note} />
              </div>
            ))
          }
          {
            (loading == false && movieNotes.length === 0) && (
              <EmptyContent>
                <h4>Nenhuma nota encontrada. 😢</h4>
              </EmptyContent>
            )
          }
        </Section>
      </Content>

    </Container>
  )
}