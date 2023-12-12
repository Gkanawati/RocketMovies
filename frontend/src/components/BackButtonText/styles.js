import styled from 'styled-components';

export const Container = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.COLORS.PINK};
    margin-bottom: 12px;
    cursor: pointer;
  }
`;