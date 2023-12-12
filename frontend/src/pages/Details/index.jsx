import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

import { Tag } from '../../components/Tag';
import { Header } from '../../components/Header';
import { BackButtonText } from '../../components/BackButtonText';

import { api } from '../../services/api';
import { renderStars } from '../../utils/renderStars';

import {
  AdditionalInfo,
  AuthorSection,
  Container,
  Content,
  TagsContainer,
  TimeSection,
  TitleSection
} from './styles';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  
  const avatarFilePath = data && data.author ? `${api.defaults.baseURL}/files/${data.author.avatar}` : null;
  const avatar = data && data.author.avatar ? avatarFilePath : avatarPlaceholder;

  const formattedDate = data && data.created_at ? format(new Date(data.created_at), 'dd/MM/yy \'às\' HH:mm') : '';

  useEffect(() => {
    async function getMovieNote() {
      const response = await api.get(`/movie_notes/${params.id}`);
      setData(response.data);
    }
    getMovieNote();
  }, [])

  return (
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <BackButtonText />

            <TitleSection>
              <h1>
                {data.title}
              </h1>

              {data.rating && (
                <div>
                  {renderStars(data.rating)}
                </div>
              )}
            </TitleSection>

            <AdditionalInfo>
              <AuthorSection>
                <img
                  src={avatar}
                  alt="Foto do autor"
                />

                <span>
                  Por {data.author.name}
                </span>
              </AuthorSection>

              <TimeSection>
                <FiClock />
                <span>
                  {formattedDate}
                </span>
              </TimeSection>
            </AdditionalInfo>

            <TagsContainer>
              {
                data.tags &&
                data.tags.map((tag) =>
                  <Tag
                    key={tag.id}
                    title={tag.name}
                  />
                )
              }
            </TagsContainer>

            <p>
              {data.description}
            </p>

          </Content>
        </main>
      )}
    </Container>
  )
}