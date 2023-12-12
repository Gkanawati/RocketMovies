import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  
  width: 100%;
  background-color: ${({ theme, styleType }) => styleType == "primary" ? theme.COLORS.PINK : theme.COLORS.BACKGROUND_800};
  color: ${({ theme, styleType }) =>  styleType == "primary" ? theme.COLORS.BACKGROUND_800 : theme.COLORS.PINK};

  height: 56px;
  border: 0;
  padding: 0 16px;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`