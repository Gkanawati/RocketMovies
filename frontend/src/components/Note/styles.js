import { FiStar } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.button `
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PINK_400};
  border: none;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 16px;
  text-align: left;

  > h1 {
    flex: 1;
    font-weight: 700;
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    margin-bottom: 8px;
  }

  > p {
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    margin-top: 16px;

    overflow: hidden; /* remove o estouro do elemento */
    text-overflow: ellipsis; /* adiciona “...” no final */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* quantidade de linhas */
    -webkit-box-orient: vertical; /* conteúdo será apresentado verticalmente */
  }

  > footer {
    width: 100%;
    display: flex;
    margin-top: 24px;
  }
`;

export const Star = styled(FiStar) `
  fill: ${({ theme, isFill }) => (isFill ? theme.COLORS.PINK : theme.COLORS.GRAY_300)};
  color: ${({ theme, isFill }) => (isFill ? theme.COLORS.PINK : theme.COLORS.GRAY_300)};
  margin-right: 6px;
`;