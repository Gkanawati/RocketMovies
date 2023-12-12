import styled from 'styled-components';

export const Container = styled.textarea`
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PINK_700};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border: none;
  resize: none;
  
  margin-bottom: 8px;
  border-radius: 10px;
  padding: 16px;

  min-height: 120px;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`;