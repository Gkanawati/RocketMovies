import { useState } from 'react';

import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { BackButtonText } from '../../components/BackButtonText';

import { Container, Content, Row } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export function New() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagLink, setTagLink] = useState("");

  const navigate = useNavigate();

  function handleAddTag() {
    if (!tagLink) {
      return alert('Preencha o campo.');
    }
    setTags(prevState => [...prevState, tagLink]);
    setTagLink("");
  }

  function handleRemoveTag(tag) {
    console.log('handleRemoveTag ~ tag:', tag);
    setTags(prevState => prevState.filter(item => item !== tag));
  }

  function handleBack() {
    navigate(-1);
  }

  async function handleSaveMovieNote() {
    if (!title || !rating || !description || !tags.length) {
      return alert('Preencha todos os campos.');
    }

    if (rating < 0 || rating > 5) {
      return alert('A nota deve ser entre 0 e 5.');
    }

    if (tagLink) {
      return alert('Clique em Adicionar para adicionar o marcador.');
    }
    
    try {
      await api.post('/movie_notes', {
        title,
        rating,
        description,
        tags
      })

      alert('Nota criada com sucesso!');
      handleBack();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <Header />

      <Content>
        <div>
          <BackButtonText />

          <h1>Novo Filme</h1>
        </div>

        <Row>
          <Input 
            placeholder="Título" 
            value={title}
            onChange={e => setTitle(e.target.value)}  
          />
          <Input 
            placeholder="Sua nota (de 0 a 5)"
            value={rating}
            onChange={e => setRating(e.target.value)}
          />
        </Row>

        <TextArea 
          placeholder="Observações"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Section title="Marcadores">
          <div className='tags'>
            {
              tags.map(tag => (
                <NoteItem 
                  key={String(tag)} 
                  value={tag} 
                  onClick={() => handleRemoveTag(tag)} 
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo marcador"
              value={tagLink}
              onChange={e => setTagLink(e.target.value)}
              onClick={e => handleAddTag(e.target.value)}
            />
          </div>
        </Section>

        <Row>
          <Button styleType='secondary' type="secondary" title="Cancelar" onClick={handleBack} />
          <Button 
            title="Salvar Alterações"
            onClick={handleSaveMovieNote}
          />
        </Row>
      </Content>
    </Container>
  )
}