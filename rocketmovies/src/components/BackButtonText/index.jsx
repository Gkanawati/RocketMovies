import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { Container } from './styles';

export function BackButtonText() {

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container>
      <div onClick={() => handleBack()}>
        <a>
          <FiArrowLeft />
          Voltar
        </a>
      </div>
    </Container>
  )
}