import styled from 'styled-components';
import { FiStar } from 'react-icons/fi';

export function renderStars(rate) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} isFill={i <= rate} />);
  }
  return stars;
}

export const Star = styled(FiStar) `
  fill: ${({ theme, isFill }) => (isFill ? theme.COLORS.PINK : theme.COLORS.GRAY_300)};
  color: ${({ theme, isFill }) => (isFill ? theme.COLORS.PINK : theme.COLORS.GRAY_300)};
  margin-right: 6px;
`;